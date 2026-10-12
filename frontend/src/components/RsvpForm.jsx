import { useState } from 'react';
import { ArrowRight, CalendarDays, CircleCheck, LoaderCircle } from 'lucide-react';
import { event } from '../weddingConfig';

const field =
  'w-full rounded-2xl border border-sage-200 bg-snow px-4 py-3.5 text-[15px] text-ink outline-none transition placeholder:text-ink/35 focus:border-sage-500 focus:ring-2 focus:ring-sage-300/60';

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="mb-2 block text-[13px] text-ink/75">
        {label} {required && <span aria-hidden="true">*</span>}
        {children}
      </label>
      {error && <p role="alert" className="mt-1.5 text-[13px] text-red-700">{error}</p>}
    </div>
  );
}

// Empty in local dev (Vite proxies /api). On Vercel, set VITE_API_URL to the Render backend URL.
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

const EMPTY = { name: '', email: '', phone: '', attending: 'yes', guests: '1', message: '', website: '' };

export default function RsvpForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setErrors({});
    setServerError('');
    setStatus('sending');
    try {
      const res = await fetch(`${API_URL}/api/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) return setStatus('done');
      if (data.errors) setErrors(data.errors);
      setServerError(data.error || (data.errors ? '' : 'Une erreur est survenue. Merci de réessayer.'));
    } catch {
      setServerError('Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.');
    }
    setStatus('error');
  }

  if (status === 'done') {
    const yes = form.attending === 'yes';
    return (
      <section id="rsvp" className="bg-snow px-6 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto max-w-xl text-center" role="status">
          <CircleCheck size={44} strokeWidth={1.3} className="mx-auto text-sage-600" />
          <h2 className="mt-5 font-serif text-[clamp(2.2rem,8vw,3.2rem)] leading-[1.1] text-moss-800">
            {yes ? 'Merci, à très bientôt !' : 'Merci de nous avoir répondu.'}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-ink/70">
            {yes
              ? 'Votre présence est bien enregistrée. Nous avons hâte de partager ce jour avec vous.'
              : 'Votre réponse est bien enregistrée. Vous serez dans nos pensées ce jour-là.'}
          </p>
        </div>
      </section>
    );
  }

  const sending = status === 'sending';

  return (
    <section id="rsvp" className="bg-snow px-6 py-16 sm:px-10 lg:py-24">
      <div className="mx-auto max-w-xl">
        <h2 className="font-serif text-[clamp(2.4rem,9vw,3.4rem)] leading-[1.08] text-moss-800">
          Confirmer
          <br />
          ma présence
        </h2>
        <p className="mt-4 text-[16px] text-ink/70">Un petit mot pour nous dire si vous serez à nos côtés.</p>

        <p className="mt-6 flex items-center gap-3 rounded-2xl bg-sage-100 px-4 py-3 text-[13px] text-ink/75">
          <CalendarDays size={18} strokeWidth={1.5} className="shrink-0 text-sage-600" />
          {event.dateLabel}
        </p>

        <form onSubmit={submit} noValidate className="mt-8 space-y-6">
          <Field label="Prénom et nom" required error={errors.name}>
            <input
              className={`${field} mt-2`}
              type="text"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              value={form.name}
              onChange={set('name')}
              placeholder="Votre prénom et votre nom"
            />
          </Field>

          <Field label="Adresse e-mail" required error={errors.email}>
            <input
              className={`${field} mt-2`}
              type="email"
              name="email"
              autoComplete="email"
              required
              maxLength={254}
              value={form.email}
              onChange={set('email')}
              placeholder="Votre adresse e-mail"
            />
          </Field>

          <Field label="Numéro de téléphone" required error={errors.phone}>
            <input
              className={`${field} mt-2`}
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              required
              maxLength={25}
              value={form.phone}
              onChange={set('phone')}
              placeholder="Ex. +237 6 12 34 56 78"
            />
          </Field>

          <fieldset>
            <legend className="mb-2 text-[13px] text-ink/75">
              Serez-vous des nôtres ? <span aria-hidden="true">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-3">
              {[
                ['yes', 'Avec joie'],
                ['no', 'Je ne pourrai pas'],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-2xl border px-4 py-3.5 text-[14px] transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sage-400 ${
                    form.attending === value
                      ? 'border-sage-500 bg-sage-100 text-moss-800'
                      : 'border-sage-200 bg-snow text-ink/75'
                  }`}
                >
                  <input
                    type="radio"
                    name="attending"
                    value={value}
                    checked={form.attending === value}
                    onChange={set('attending')}
                    className="h-4 w-4 accent-moss-800"
                  />
                  {label}
                </label>
              ))}
            </div>
            {errors.attending && <p role="alert" className="mt-1.5 text-[13px] text-red-700">{errors.attending}</p>}
          </fieldset>

          {form.attending === 'yes' && (
            <Field label="Nombre d’invités (vous inclus)" required error={errors.guests}>
              <select
                className={`${field} mt-2 appearance-none`}
                name="guests"
                value={form.guests}
                onChange={set('guests')}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'personne' : 'personnes'}
                  </option>
                ))}
              </select>
            </Field>
          )}

          <Field label="Un mot pour les mariés (facultatif)" error={errors.message}>
            <textarea
              className={`${field} mt-2 min-h-[110px] resize-y`}
              name="message"
              rows={4}
              maxLength={1000}
              value={form.message}
              onChange={set('message')}
              placeholder="Votre message..."
            />
          </Field>

          {/* Honeypot: invisible to people, bots fill it in. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Ne pas remplir
              <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
            </label>
          </div>

          {serverError && (
            <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-[14px] text-red-800">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="flex w-full items-center justify-center gap-3 rounded-full bg-moss-800 px-7 py-4 text-[15px] font-medium text-paper shadow-[0_12px_28px_-14px_rgba(47,70,48,0.8)] transition-colors hover:bg-moss-700 disabled:cursor-wait disabled:opacity-70"
          >
            {sending ? (
              <>
                Envoi en cours <LoaderCircle size={17} className="animate-spin" />
              </>
            ) : (
              <>
                Envoyer ma réponse <ArrowRight size={17} strokeWidth={1.7} />
              </>
            )}
          </button>

          <p className="text-[12px] leading-relaxed text-ink/45">
            * Champs obligatoires. Vos informations sont réservées à l’organisation de notre mariage.
          </p>
        </form>
      </div>
    </section>
  );
}
