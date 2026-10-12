import { MessageCircle } from 'lucide-react';
import Monogram from './Monogram';
import { contact, couple } from '../weddingConfig';

export default function Footer() {
  return (
    <footer id="contact" className="bg-sage-100 px-6 pb-10 pt-16 text-center sm:px-10">
      <div className="mx-auto flex max-w-2xl flex-col items-center">
        <Monogram size={76} sprig />
        <p className="mt-8 font-script text-[clamp(2.2rem,9vw,3.2rem)] leading-tight text-sage-700">
          {couple.names}
        </p>
        <p className="mt-3 text-[12px] uppercase tracking-[0.16em] text-clay-deep">
          {couple.dateLabel} · {couple.city}, {couple.country}
        </p>
        <p className="mt-5 font-serif text-lg italic text-ink/70">Merci de faire partie de notre histoire.</p>
        <a
          href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-moss-800 px-7 py-3.5 text-[14px] font-medium tracking-[0.02em] text-paper shadow-[0_12px_28px_-14px_rgba(47,70,48,0.8)] transition-colors duration-300 hover:bg-moss-700"
        >
          <MessageCircle size={18} strokeWidth={1.6} />
          Nous contacter sur WhatsApp
        </a>
      </div>
      <p className="mt-12 text-[12px] text-ink/50">
        © 2026 {couple.shortNames}. Fait avec amour.
      </p>
    </footer>
  );
}
