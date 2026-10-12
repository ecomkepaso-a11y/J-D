import { test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { once } from 'node:events';

// Starts a fake Brevo, then the real server pointed at it.
async function boot() {
  const received = [];
  const brevo = http.createServer((req, res) => {
    let b = '';
    req.on('data', (c) => (b += c));
    req.on('end', () => {
      received.push({ headers: req.headers, body: JSON.parse(b) });
      res.writeHead(201, { 'content-type': 'application/json' });
      res.end('{"messageId":"<x>"}');
    });
  }).listen(0);
  await once(brevo, 'listening');

  const port = 4100 + Math.floor(Math.random() * 500);
  const child = spawn(process.execPath, ['src/server.js'], {
    env: {
      ...process.env, PORT: String(port), BREVO_API_KEY: 'test-key', SENDER_EMAIL: 'jessicamouto02@gmail.com',
      RSVP_RECIPIENT: 'jessicamouto02@gmail.com', BREVO_API_URL: `http://localhost:${brevo.address().port}/v3/smtp/email`,
    },
    stdio: ['ignore', 'pipe', 'inherit'],
  });
  await new Promise((r) => child.stdout.on('data', (d) => String(d).includes('RSVP API') && r()));
  const post = (body) => fetch(`http://localhost:${port}/api/rsvp`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
  });
  return { post, received, stop: () => { child.kill(); brevo.close(); } };
}

test('rsvp flow', async () => {
  const s = await boot();
  try {
    // valid → email sent to Jessica with reply-to the guest
    let r = await s.post({ name: 'Marie <b>Ngo</b>', email: 'Marie@Example.com', phone: '+237 656 14 00 77', guests: 3, attending: 'yes', message: 'Hâte !' });
    assert.equal(r.status, 200);
    const sent = s.received[0];
    assert.equal(sent.headers['api-key'], 'test-key');
    assert.equal(sent.body.to[0].email, 'jessicamouto02@gmail.com');
    assert.equal(sent.body.replyTo.email, 'marie@example.com');
    assert.ok(!sent.body.htmlContent.includes('<b>Ngo'), 'html must be escaped');
    assert.ok(sent.body.textContent.includes('+237 656 14 00 77') && sent.body.textContent.includes(': 3'));

    // invalid → 422, nothing sent
    r = await s.post({ name: '', email: 'nope', attending: 'maybe', phone: 'abc' });
    assert.equal(r.status, 422);
    const j = await r.json();
    assert.ok(j.errors.name && j.errors.email && j.errors.attending && j.errors.phone);

    // honeypot → pretend ok, nothing sent
    r = await s.post({ name: 'Bot Bot', email: 'b@b.com', phone: '12345678', attending: 'yes', website: 'http://spam' });
    assert.equal(r.status, 200);
    assert.equal(s.received.length, 1);

    // rate limit
    let last;
    for (let i = 0; i < 4; i++) last = await s.post({ name: 'Rate Test', email: 'r@r.com', phone: '12345678', attending: 'no' });
    assert.equal(last.status, 429);
  } finally { s.stop(); }
});
