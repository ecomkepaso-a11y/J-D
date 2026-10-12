// Large, faint leaf outline used as background decoration.
export default function LeafOutline({ className = '' }) {
  return (
    <svg
      viewBox="0 0 200 300"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      className={className}
    >
      <path d="M100 296C28 226 20 96 100 4c80 92 72 222 0 292Z" />
    </svg>
  );
}
