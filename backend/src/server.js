import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Load backend/.env when it exists (hosts usually inject real env vars instead).
try { process.loadEnvFile(new URL('../.env', import.meta.url)); } catch { /* no .env file */ }

const { validateRsvp } = await import('./validate.js');
const { buildRsvpEmail } = await import('./emailTemplate.js');
const { sendEmail } = await import('./brevo.js');

const PORT = Number(process.env.PORT) || 4000;
const RECIPIENT = process.env.RSVP_RECIPIENT || 'jessicamouto02@gmail.com';
// One or several allowed site addresses, comma separated, no trailing slash.
const CORS_ORIGINS = (process.env.CORS_ORIGIN || '').split(',').map((o) => o.trim().replace(/\/+$/, '')).filter(Boolean);
const TRUST_PROXY = process.env.TRUST_PROXY === '1';
const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../frontend/dist');

// --- tiny in-memory rate limiter: 5 submissions / 10 min / IP -------------
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}
setInterval(() => {
  const now = Date.now();
  for (const [ip, list] of hits) if (list.every((t) => now - t >= WINDOW_MS)) hits.delete(ip);
}, WINDOW_MS).unref();

const clientIp = (req) =>
  (TRUST_PROXY && String(req.headers['x-forwarded-for'] || '').split(',')[0].trim()) || req.socket.remoteAddress || 'unknown';

function send(res, status, body, extra = {}) {
  const payload = JSON.stringify(body);
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', ...extra });
  res.end(payload);
}

function readJson(req, limit = 16 * 1024) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > limit) { reject(Object.assign(new Error('too large'), { status: 413 })); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')); }
      catch { reject(Object.assign(new Error('bad json'), { status: 400 })); }
    });
    req.on('error', reject);
  });
}

async function handleRsvp(req, res) {
  if (limited(clientIp(req))) {
    return send(res, 429, { ok: false, error: 'Trop de tentatives. Merci de réessayer dans quelques minutes.' });
  }

  let body;
  try { body = await readJson(req); }
  catch (e) { return send(res, e.status || 400, { ok: false, error: 'Requête invalide.' }); }

  const { ok, errors, value, isBot } = validateRsvp(body);
  if (isBot) return send(res, 200, { ok: true }); // pretend success, send nothing
  if (!ok) return send(res, 422, { ok: false, errors });

  const mail = buildRsvpEmail(value);
  try {
    await sendEmail({
      to: RECIPIENT,
      replyTo: { email: value.email, name: value.name },
      ...mail,
    });
  } catch (err) {
    console.error('[rsvp] email failed:', err.message);
    return send(res, 502, { ok: false, error: 'L’envoi a échoué. Merci de réessayer dans un instant.' });
  }
  console.log(`[rsvp] ${value.attending} · ${value.name}`);
  return send(res, 200, { ok: true });
}

// --- serve the built frontend (npm run build) when it exists --------------
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.json': 'application/json', '.ico': 'image/x-icon',
};
function serveStatic(req, res) {
  if (!fs.existsSync(DIST)) return send(res, 404, { ok: false, error: 'Not found' });
  const pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = path.join(DIST, pathname);
  if (!file.startsWith(DIST)) return send(res, 403, { ok: false });
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(DIST, 'index.html');
  const ext = path.extname(file);
  const cache = file.includes(`${path.sep}assets${path.sep}`) ? 'public, max-age=31536000, immutable' : 'no-cache';
  res.writeHead(200, { 'content-type': MIME[ext] || 'application/octet-stream', 'cache-control': cache });
  fs.createReadStream(file).pipe(res);
}

const server = http.createServer(async (req, res) => {
  const { pathname } = new URL(req.url, 'http://x');

  if (CORS_ORIGINS.length && pathname.startsWith('/api/')) {
    const origin = req.headers.origin;
    if (origin && CORS_ORIGINS.includes(origin)) res.setHeader('access-control-allow-origin', origin);
    res.setHeader('vary', 'Origin');
    res.setHeader('access-control-allow-methods', 'POST, OPTIONS');
    res.setHeader('access-control-allow-headers', 'content-type');
    if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
  }

  try {
    if (pathname === '/api/health' && req.method === 'GET') return send(res, 200, { ok: true });
    if (pathname === '/api/rsvp') {
      if (req.method !== 'POST') return send(res, 405, { ok: false }, { allow: 'POST' });
      return await handleRsvp(req, res);
    }
    if (req.method === 'GET' || req.method === 'HEAD') return serveStatic(req, res);
    return send(res, 404, { ok: false, error: 'Not found' });
  } catch (err) {
    console.error('[server]', err);
    if (!res.headersSent) send(res, 500, { ok: false, error: 'Erreur du serveur.' });
  }
});

server.listen(PORT, () => {
  console.log(`RSVP API on http://localhost:${PORT}`);
  if (!process.env.BREVO_API_KEY) console.warn('⚠ BREVO_API_KEY is not set — RSVPs will fail until you add it to backend/.env');
});
