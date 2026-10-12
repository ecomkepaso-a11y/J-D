// Small sprig of leaves, drawn as outlines.
export default function Sprig({ className = '', size = 56 }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 58C20 44 34 28 52 8" />
      <path d="M22 44c-8 0-12-5-12-12 8 0 12 5 12 12Z" />
      <path d="M32 33c-8 1-13-3-14-10 8-1 13 3 14 10Z" />
      <path d="M42 21c-7 2-13 0-16-6 7-2 13 0 16 6Z" />
      <path d="M26 40c1-8 6-12 13-12-1 8-6 12-13 12Z" />
      <path d="M37 28c2-7 7-11 14-10-2 7-7 11-14 10Z" />
    </svg>
  );
}
