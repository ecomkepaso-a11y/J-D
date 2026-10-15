import { Heart } from 'lucide-react';

// Same sage/moss tones as the rest of the site, with a soft shimmer on the script title.
const shimmer =
  'linear-gradient(100deg, var(--color-moss-800) 0%, var(--color-sage-500) 45%, var(--color-sage-700) 70%, var(--color-moss-800) 100%)';

export default function MessageDuCoeur() {
  return (
    <section id="message" className="bg-paper px-5 py-16 sm:px-10 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage-100 text-sage-600 shadow-[0_10px_30px_-18px_rgba(47,70,48,0.55)]">
          <Heart size={24} strokeWidth={1.6} />
        </span>

        <p className="mt-6 text-[12px] uppercase tracking-[0.3em] text-sage-600">Un message du cœur</p>

        <h2
          className="mt-3 inline-block bg-clip-text px-2 py-2 font-script text-[clamp(3rem,13vw,4.6rem)] leading-[1.2] text-transparent"
          style={{ backgroundImage: shimmer }}
        >
          Cher(e) Invité(e)
        </h2>

        <div className="mt-8 rounded-[2rem] border border-sage-200 bg-snow px-7 py-9 shadow-[0_24px_50px_-34px_rgba(47,70,48,0.55)] sm:px-12">
          <p className="font-serif text-[1.2rem] leading-[1.9] text-ink/85 sm:text-[1.35rem]">
            Vous êtes cordialement invités à la célébration de notre mariage et nous serons ravis de partager ce
            nouveau chapitre de notre vie avec ceux qui nous sont les plus chers.
          </p>
        </div>
      </div>
    </section>
  );
}