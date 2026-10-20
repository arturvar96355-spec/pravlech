const paths = [
  'M421 82c52 52 63 137 28 205s-118 121-198 124S77 366 45 288 29 120 100 62 369 30 421 82z',
  'M440 120c37 70 22 160-36 213s-153 70-222 36S50 262 62 178 148 36 244 45s159 5 196 75z',
  'M410 60c58 44 80 130 52 200s-108 118-191 130S93 372 52 290 55 128 133 70s219-54 277-10z',
];

/** Мягкая органическая форма за фото/монограммами. */
export function Blob({ className, variant = 0, fill = 'currentColor' }: { className?: string; variant?: 0 | 1 | 2; fill?: string }) {
  return (
    <svg viewBox="0 0 500 450" className={className} aria-hidden fill={fill}>
      <path d={paths[variant]} />
    </svg>
  );
}
