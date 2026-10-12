import Sprig from './Sprig';
import { gallery } from '../weddingConfig';

const shapes = {
  arch: 'rounded-t-[999px] rounded-b-[1.1rem]',
  round: 'rounded-[1.4rem] sm:rounded-[2rem]',
};

export default function Gallery() {
  return (
    <section id="galerie" className="bg-paper px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-clay-deep">Instants choisis</p>
            <h2 className="mt-3 font-serif text-[clamp(2.2rem,8vw,3.6rem)] leading-[1.05] text-ink">
              L’amour dans les détails.
            </h2>
          </div>
          <Sprig size={64} className="mt-2 shrink-0 -rotate-[8deg] text-sage-400" />
        </div>

        <div className="mt-12 grid grid-cols-[1fr_1.12fr_1fr] items-end gap-3 sm:mt-16 sm:gap-6 lg:gap-8">
          {gallery.map((item) => (
            <figure key={item.src} className="m-0">
              <div className={`overflow-hidden bg-sage-200 ${shapes[item.shape]} ${item.aspect}`}>
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className={`h-full w-full object-cover ${item.position}`}
                />
              </div>
              <figcaption className="mt-3 max-w-[16rem] font-serif text-[13px] italic leading-snug text-ink/70 sm:mt-4 sm:text-[17px]">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
