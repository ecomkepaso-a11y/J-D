import { ArrowRight } from 'lucide-react';

export default function CtaButton({ href = '#rsvp', children, className = '' }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full bg-moss-800 px-7 py-3.5 text-[14px] font-medium tracking-[0.02em] text-paper shadow-[0_12px_28px_-14px_rgba(47,70,48,0.8)] transition-colors duration-300 hover:bg-moss-700 ${className}`}
    >
      {children}
      <ArrowRight
        size={16}
        strokeWidth={1.7}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </a>
  );
}
