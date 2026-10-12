import { Mouse } from 'lucide-react';
import Monogram from './Monogram';
import LeafOutline from './LeafOutline';
import { couple, heroImage } from '../weddingConfig';

const delay = (s) => ({ animationDelay: `${s}s` });

function Star({ className = '' }) {
  return (
    <svg viewBox="0 0 12 12" width="9" height="9" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M6 0l1.3 4.7L12 6 7.3 7.3 6 12 4.7 7.3 0 6l4.7-1.3z" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative isolate overflow-hidden bg-sage-100 pt-16 lg:min-h-svh lg:pt-0"
    >
      {/* faint leaf outlines */}
      <LeafOutline className="pointer-events-none absolute -left-24 top-[18%] -z-10 hidden h-[430px] w-[290px] rotate-[34deg] text-sage-300/90 md:block" />
      <LeafOutline className="pointer-events-none absolute bottom-[-10%] left-[26%] -z-10 hidden h-[380px] w-[250px] -rotate-[58deg] text-sage-300/90 lg:block" />
      <LeafOutline className="pointer-events-none absolute -right-16 bottom-16 -z-10 h-[260px] w-[170px] rotate-[28deg] text-sage-300/80 md:hidden" />

      {/* Photo: on top for phones, on the right for desktop */}
      <div className="hero-photo-fade fade-in relative h-[46svh] min-h-[270px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[62%]">
        <img
          src={heroImage}
          alt="Jessica et Darryl, face à face, riant aux éclats"
          fetchPriority="high"
          className="h-full w-full object-cover object-[52%_28%] lg:object-[60%_30%]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 sm:px-10 lg:flex lg:min-h-svh lg:items-center lg:px-14 lg:pb-12 lg:pt-20">
        <div className="-mt-4 lg:mt-0 lg:max-w-[540px]">
          <div className="rise" style={delay(0.1)}>
            <Monogram size={84} />
          </div>

          <p
            className="rise mt-6 text-[12px] uppercase tracking-[0.2em] text-sage-700/80 lg:mt-7"
            style={delay(0.25)}
          >
            Célébration de mariage
          </p>

          <h1
            className="rise mt-1 font-script text-[clamp(3.6rem,19vw,5.4rem)] leading-[1.05] text-sage-600 lg:text-[6rem]"
            style={delay(0.4)}
          >
            Invitation
          </h1>

          <div
            className="rise my-6 flex w-full max-w-[500px] items-center gap-4 lg:my-8"
            style={delay(0.55)}
            aria-hidden="true"
          >
            <span className="h-px flex-1 bg-sage-500/45" />
            <span className="h-2 w-2 rounded-full bg-clay" />
            <span className="h-px flex-1 bg-sage-500/45" />
          </div>

          <p
            className="rise text-balance font-serif text-[clamp(1.75rem,7.4vw,2.6rem)] leading-tight text-ink"
            style={delay(0.65)}
          >
            {couple.names}
          </p>

          <p
            className="rise mt-3 text-[12px] uppercase tracking-[0.14em] text-clay-deep sm:text-[13px] sm:tracking-[0.16em]"
            style={delay(0.78)}
          >
            {couple.dateLabel} · {couple.city}, {couple.country}
          </p>

          <p
            className="rise mt-8 flex items-center gap-3 font-script text-[1.7rem] leading-none text-clay-deep"
            style={delay(0.92)}
          >
            <Star className="text-clay" />
            Avec amour
            <Star className="text-clay" />
          </p>
        </div>

        <a
          href="#galerie"
          aria-label="Défiler vers la suite"
          className="rise mx-auto mt-12 flex w-fit flex-col items-center gap-2 text-sage-700/70 transition-colors hover:text-sage-700 lg:absolute lg:bottom-8 lg:left-14 lg:mx-0 lg:mt-0 lg:items-start"
          style={delay(1.1)}
        >
          <span className="text-[11px] uppercase tracking-[0.2em]">Défiler</span>
          <Mouse size={22} strokeWidth={1.2} />
        </a>
      </div>
    </section>
  );
}
