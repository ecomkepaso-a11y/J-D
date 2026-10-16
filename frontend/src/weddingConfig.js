// Everything about the couple and the day lives here.
// Change a value once and it updates across the whole site.

export const couple = {
  monogram: 'J & D',
  bride: 'Jessica Sema',
  groom: 'Darryl Ekoume',
  names: 'Jessica Sema & Darryl Ekoume',
  shortNames: 'Jessica & Darryl',
  dateLabel: '12 Décembre 2026',
  city: 'Douala Bonaberi',
  country: 'Cameroun',
  weddingDate: '2026-12-12',
};

// Details shown in the invitation card and the RSVP form.
export const event = {
  title: 'Mariage Civil',
  dateLabel: '12 décembre 2026',
  time: '14:00',
  mapUrl: 'https://maps.app.goo.gl/54QRAKH9u5hiw6UB9',

};

export const navLinks = [
  { href: '#celebration', label: 'Célébrations' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#programme', label: 'Programme' },
  { href: '#rsvp', label: 'RSVP' },
  { href: '#contact', label: 'Contact' },
];

export const contact = {
  whatsappNumber: '237656140077',
  whatsappMessage: 'Bonjour, je vous contacte au sujet de votre mariage.',
};

export const inviteMessage =
  'Deux histoires qui s’unissent pour n’en former qu’une seule, c’est le début d’un nouveau chapitre qui commence... Venez le célébrer avec nous !';

export const heroImage = '/images/hero.jpg';

// "L'amour dans les détails" — three photos, three captions
export const gallery = [
  {
    src: '/images/hero.jpg',
    alt: 'Jessica et Darryl riant aux éclats dans un jardin',
    caption: 'Rire, toujours.',
    shape: 'arch',
    aspect: 'aspect-[0.9]',
    position: 'object-[62%_30%]',
  },
  {
    src: '/images/water.jpg',
    alt: 'Jessica et Darryl au bord de l’eau au coucher du soleil',
    caption: 'Un amour parfait.',
    shape: 'arch',
    aspect: 'aspect-[0.8]',
    position: 'object-[55%_50%]',
  },
  {
    src: '/images/selfie.jpg',
    alt: 'Selfie de Jessica et Darryl, lui un clin d’œil, elle un baiser',
    caption: 'Les petits instants qui font tout.',
    shape: 'round',
    aspect: 'aspect-[1.05]',
    position: 'object-[50%_16%]',
  },
];
