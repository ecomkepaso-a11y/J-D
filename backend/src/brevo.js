// Sends one transactional email through Brevo's REST API (no SDK needed).
// Docs: https://developers.brevo.com/reference/sendtransacemail

const API_URL = process.env.BREVO_API_URL || 'https://api.brevo.com/v3/smtp/email';

export async function sendEmail({ to, replyTo, subject, html, text }) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.SENDER_EMAIL;
  if (!apiKey || !senderEmail) {
    throw new Error('BREVO_API_KEY and SENDER_EMAIL must be set');
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'api-key': apiKey, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      sender: { email: senderEmail, name: process.env.SENDER_NAME || 'Invitation Jessica & Darryl' },
      to: [{ email: to }],
      replyTo,
      subject,
      htmlContent: html,
      textContent: text,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Brevo responded ${res.status}: ${detail.slice(0, 300)}`);
  }
  return res.json().catch(() => ({}));
}
