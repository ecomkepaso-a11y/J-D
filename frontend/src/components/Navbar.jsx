import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { couple, navLinks } from '../weddingConfig';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-[background-color,box-shadow] duration-300 ${
        open ? 'bg-sage-100' : 'bg-sage-100/80'
      } ${scrolled || open ? 'shadow-[0_1px_0_rgba(70,96,59,0.14)]' : ''}`}
    >
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-10 lg:h-[72px] lg:px-14"
      >
        <a href="#accueil" className="font-script text-[1.75rem] leading-none text-sage-600">
          {couple.monogram}
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[14px] tracking-[0.04em] text-ink/80 transition-colors hover:text-sage-600"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="-mr-2 rounded-full p-2 text-sage-700 lg:hidden"
        >
          {open ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out lg:hidden ${
          open ? 'max-h-[26rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col px-6 pb-6 pt-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-sage-300/60 px-1 py-3.5 text-[17px] text-ink/85 transition-colors hover:text-sage-600"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
