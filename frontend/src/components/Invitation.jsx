import { CalendarDays, Clock, MapPin, ArrowUpRight } from 'lucide-react';
import CtaButton from './CtaButton';
import { event, heroImage, inviteMessage } from '../weddingConfig';

function Detail({ icon: Icon, title, hint }) {
  return (
    <li className="flex items-center gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sage-100 text-sage-600">
        <Icon size={19} strokeWidth={1.5} />
      </span>
      <div>
        <p className="text-[16px] font-medium text-ink">{title}</p>
        <p className="text-[13px] text-ink/55">{hint}</p>
      </div>
    </li>
  );
}

export default function Invitation() {
  return (
    <section id="programme" className="bg-sage-100 px-5 py-16 sm:px-10 lg:px-14 lg:py-24">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-balance font-serif text-[clamp(2.2rem,8vw,3.2rem)] leading-[1.1] text-moss-800">
          Un jour, notre oui.
        </h2>
        <p className="mt-3 text-[14px] text-ink/70">Une seule célébration, mille émotions.</p>
      </div>

      <article className="mx-auto mt-9 max-w-xl overflow-hidden rounded-[2rem] bg-snow shadow-[0_24px_50px_-34px_rgba(47,70,48,0.55)]">
        <img
          src={heroImage}
          alt="Jessica et Darryl, complices, riant ensemble"
          loading="lazy"
          className="aspect-[2.1] w-full object-cover object-[60%_30%]"
        />

        <div className="px-6 pb-7 pt-6 sm:px-9">
          <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50">Vous êtes nos invités</p>
          <h3 className="mt-2 font-serif text-[2.1rem] leading-tight text-moss-800">{event.title}</h3>

          <ul className="mt-6 space-y-5">
            <Detail icon={CalendarDays} title={event.dateLabel} hint="Le jour de notre union" />
            <Detail icon={Clock} title={event.time} hint="Cérémonie suivie d’un cocktail dînatoire" />
            <li className="flex items-center gap-4">
  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sage-100 text-sage-600">
    <MapPin size={19} strokeWidth={1.5} />
  </span>
  <div>
    <p className="text-[16px] font-medium text-ink">Cafrad Bonaberi ( Derrière Hôtel Royal Palace )</p>
    <a
      href={event.mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-[13px] text-sage-700 underline underline-offset-4 hover:text-moss-800"
    >
      Voir sur Google Maps <ArrowUpRight size={13} />
    </a>
  </div>
</li>
          </ul>



          <hr className="my-6 border-sage-200" />
          <p className="text-pretty font-serif text-[1.35rem] italic leading-snug text-moss-800">
            {inviteMessage}
          </p>
          <hr className="my-6 border-sage-200" />
          <p className="text-[14px] leading-relaxed text-ink/70">
            Après la cérémonie, la joie se prolonge autour D’un cocktail dînatoire.
          </p>
        </div>
      </article>

      <div className="mx-auto mt-5 max-w-xl">
        <CtaButton className="w-full justify-center py-4">Confirmer ma présence</CtaButton>
      </div>
    </section>
  );
}
