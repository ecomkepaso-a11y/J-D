# Jessica Sema & Darryl Ekoume — Wedding invitation

Built step by step.

**Done so far (step 3):** sage hero · "Un jour, notre oui." invitation card · gallery · "Retrouvons-nous à Douala" · RSVP form (phone + number of guests) · WhatsApp contact button · footer · backend that emails each RSVP via Brevo.

## Run it

```bash
# 1. backend (no dependencies to install)
cd backend
cp .env.example .env      # then paste your Brevo API key in BREVO_API_KEY
npm run dev               # http://localhost:4000

# 2. frontend (second terminal)
cd frontend
npm install
npm run dev               # http://localhost:5173 (proxies /api to the backend)
```

## Brevo setup

1. Brevo > SMTP & API > API Keys > generate a key, put it in `backend/.env`.
2. Brevo > Senders > make sure `jessicamouto02@gmail.com` is added and verified (it is the sender and the recipient).
3. Each RSVP arrives in that inbox; hitting "Reply" writes straight to the guest.

`cd backend && npm test` checks the whole flow against a fake Brevo.

## Deploy

`cd frontend && npm run build`, then run `backend` on any Node 20.12+ host: it serves the site and the API together. Set `BREVO_API_KEY`, `SENDER_EMAIL`, `RSVP_RECIPIENT` and `TRUST_PROXY=1` as environment variables.

## Where to edit things

- `frontend/src/weddingConfig.js` — invitation card details (`event`), names, date, city, menu links, gallery photos and captions
- `frontend/public/images/` — `hero.jpg`, `water.jpg`, `selfie.jpg` (swap a file, keep its name)
- `frontend/src/index.css` — colour palette (sage, cream, moss, clay) and fonts

## Menu links

Célébrations, Galerie, RSVP and Contact already scroll to their sections.
"Programme" scrolls to the invitation card.

