const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function buildRsvpEmail({ name, email, phone, attending, guests, message }) {
  const yes = attending === 'yes';
  const answer = yes ? 'sera présent(e) 🎉' : 'ne pourra pas venir';
  const subject = `${yes ? '✅' : '❌'} RSVP · ${name} ${yes ? 'sera des vôtres' : 'ne pourra pas venir'}`;

  const text = [
    `Nouvelle réponse au mariage de Jessica & Darryl`,
    ``,
    `Nom : ${name}`,
    `E-mail : ${email}`,
    `Téléphone : ${phone}`,
    ...(yes ? [`Nombre d'invités (inclus) : ${guests}`] : []),
    `Réponse : ${answer}`,
    `Message : ${message || '(aucun)'}`,
  ].join('\n');

  const color = yes ? '#2f4630' : '#8b6a4b';
  const row = (label, value) =>
    `<tr><td style="padding:10px 0;color:#8b6a4b;font-size:12px;letter-spacing:.08em;text-transform:uppercase;width:110px;vertical-align:top">${label}</td><td style="padding:10px 0;color:#26302a;font-size:15px">${value}</td></tr>`;

  const html = `<!doctype html><html lang="fr"><body style="margin:0;background:#e8ebdc;padding:24px;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:520px;margin:0 auto;background:#fcfdf9;border-radius:20px;padding:32px">
    <p style="margin:0;color:#8b6a4b;font-size:12px;letter-spacing:.2em;text-transform:uppercase">Nouvelle réponse</p>
    <h1 style="margin:8px 0 20px;font-family:Georgia,serif;font-weight:normal;font-size:26px;color:${color}">${esc(name)} ${esc(answer)}</h1>
    <table style="width:100%;border-collapse:collapse;border-top:1px solid #dce2cc">
      ${row('E-mail', `<a href="mailto:${esc(email)}" style="color:#46603b">${esc(email)}</a>`)}
      ${row('Téléphone', `<a href="tel:${esc(phone.replace(/[^\d+]/g, ''))}" style="color:#46603b">${esc(phone)}</a>`)}
      ${yes ? row('Invités', `<strong>${guests}</strong> ${guests > 1 ? 'personnes' : 'personne'} (vous inclus)`) : ''}
      ${row('Réponse', `<strong style="color:${color}">${yes ? 'Avec joie' : 'Ne pourra pas'}</strong>`)}
      ${row('Message', message ? esc(message).replace(/\n/g, '<br>') : '<em style="color:#999">Aucun message</em>')}
    </table>
    <p style="margin:24px 0 0;color:#888;font-size:12px">Vous pouvez répondre directement à cet e-mail pour écrire à l’invité.</p>
  </div></body></html>`;

  return { subject, text, html };
}
