import { Info } from 'lucide-react';
import Sprig from './Sprig';
import { couple } from '../weddingConfig';

export default function Celebration() {
  return (
    <section id="celebration" className="bg-sage-100 px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[minmax(0,380px)_1fr] md:gap-16 lg:gap-24">
        {/* arch card */}
        <div className="mx-auto flex aspect-[1.05] w-full max-w-[17rem] flex-col items-center justify-center rounded-t-[999px] rounded-b-[2rem] bg-paper text-center shadow-[0_24px_50px_-34px_rgba(47,70,48,0.55)] md:mx-0 md:max-w-sm">
          <Sprig size={44} className="text-sage-400" />
          <p className="mt-4 font-serif text-[2.6rem] leading-none text-sage-700">{couple.city}</p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-clay-deep">{couple.country}</p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-clay-deep">Rendez-vous</p>
          <h2 className="mt-3 font-serif text-[clamp(2.1rem,7.4vw,3.3rem)] leading-[1.08] text-ink">
            Retrouvons-nous à {couple.city}.
          </h2>
          <p className="mt-6 max-w-md text-pretty text-[15px] leading-relaxed text-ink/75 sm:text-base">
            Notre célébration vous attend le {couple.dateLabel.toLowerCase()}. Cérémonie suivie d’un cocktail dînatoire
          </p>
          
        </div>
      </div>
    </section>
  );
}
