const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]{2,}$/;

const clean = (v) => (typeof v === 'string' ? v.trim() : '');
// Newlines in a value that ends up in a header/subject could be abused.
const oneLine = (v) => v.replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ');

export function validateRsvp(body) {
  const data = body && typeof body === 'object' ? body : {};
  const errors = {};

  const name = oneLine(clean(data.name));
  const email = clean(data.email).toLowerCase();
  const phone = oneLine(clean(data.phone));
  const attending = clean(data.attending);
  const message = clean(data.message);

  if (name.length < 2 || name.length > 100) errors.name = 'Merci d’indiquer votre prénom et votre nom.';
  if (email.length > 254 || !EMAIL_RE.test(email)) errors.email = 'Merci d’indiquer une adresse e-mail valide.';
  const phoneDigits = phone.replace(/\D/g, '');
  if (!/^[\d+\s().-]+$/.test(phone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = 'Merci d’indiquer un numéro de téléphone valide.';
  }
  if (attending !== 'yes' && attending !== 'no') errors.attending = 'Merci de choisir une réponse.';
  // Number of people only matters when they are coming.
  let guests = 0;
  if (attending === 'yes') {
    guests = Number.parseInt(clean(String(data.guests ?? '')), 10);
    if (!Number.isInteger(guests) || guests < 1 || guests > 20) errors.guests = 'Merci d’indiquer le nombre d’invités (1 à 20).';
  }
  if (message.length > 1000) errors.message = 'Votre message est trop long (1000 caractères maximum).';

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    value: { name, email, phone, attending, guests, message },
    // Hidden field humans never see; bots fill it.
    isBot: clean(data.website) !== '',
  };
}
