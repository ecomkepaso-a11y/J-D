import { Gift, Sparkles } from 'lucide-react';

export default function ThemeEtCadeaux() {
  return (
    <section id="theme" className="bg-sage-100 px-5 py-16 sm:px-10 lg:py-24">
      <div className="mx-auto max-w-xl space-y-6">
        {/* Thème */}
        <article className="rounded-[2rem] bg-snow px-7 py-10 text-center shadow-[0_24px_50px_-34px_rgba(47,70,48,0.55)] sm:px-12">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sage-100 text-sage-600">
            <Sparkles size={22} strokeWidth={1.5} />
          </span>
          <p className="mt-5 text-[12px] uppercase tracking-[0.3em] text-sage-600">Thème</p>
          <h2 className="mt-3 font-script text-[clamp(2.8rem,12vw,4.2rem)] leading-[1.15] text-moss-800">
            Glamour &amp; Prestige
          </h2>
        </article>

        {/* Cadeaux */}
        <article className="rounded-[2rem] bg-snow px-7 py-10 text-center shadow-[0_24px_50px_-34px_rgba(47,70,48,0.55)] sm:px-12">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sage-100 text-sage-600">
            <Gift size={22} strokeWidth={1.5} />
          </span>
          <p className="mt-5 text-[12px] uppercase tracking-[0.3em] text-sage-600">Un petit mot</p>
          <p className="mt-5 font-serif text-[1.2rem] leading-[1.85] text-ink/85 sm:text-[1.3rem]">
            Votre présence sera notre plus beau cadeau. Si vous souhaitez toutefois nous témoigner votre affection,
            une participation financière ou un cadeau matériel sera accueilli avec joie et gratitude. Merci de
            contribuer, par vos délicates attentions, au bonheur de notre nouvelle vie à deux.
          </p>
        </article>
      </div>
    </section>
  );
}