import { couple } from '../weddingConfig';
import Sprig from './Sprig';

// Circle monogram. With `sprig`, a small sprig of leaves rests on the circle (used in the footer).
export default function Monogram({ size = 86, sprig = false, className = '' }) {
  return (
    <div className={`relative inline-grid place-items-center ${className}`} style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full border border-sage-500/60"
        aria-hidden="true"
      />
      {sprig && (
        <Sprig
          size={size * 0.55}
          className="absolute -right-5 -top-6 rotate-[10deg] text-sage-500"
        />
      )}
      <span
        role="img"
        aria-label={`Monogramme ${couple.monogram}`}
        className="font-script leading-none text-sage-600"
        style={{ fontSize: size * 0.265 }}
      >
        {couple.monogram}
      </span>
    </div>
  );
}
