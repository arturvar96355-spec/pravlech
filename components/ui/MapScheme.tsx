import { site } from '@/content/site';

/** Схематичная карта без внешних сервисов. Не в масштабе. */
export function MapScheme() {
  return (
    <figure className="overflow-hidden rounded-[var(--radius-lg)] bg-mint shadow-soft">
      <svg viewBox="0 0 600 380" className="block h-auto w-full" role="img" aria-label={`Схема проезда: ${site.address.street}`}>
        <rect width="600" height="380" fill="#E6F1EB" />
        <g fill="#F4EFE6">
          <rect x="30" y="30" width="150" height="90" rx="14" />
          <rect x="210" y="30" width="170" height="90" rx="14" />
          <rect x="410" y="30" width="160" height="90" rx="14" />
          <rect x="30" y="250" width="150" height="100" rx="14" />
          <rect x="410" y="250" width="160" height="100" rx="14" />
        </g>
        <g fill="#C9E0D3">
          <rect x="230" y="262" width="150" height="76" rx="30" />
        </g>
        <g stroke="#fff" strokeWidth="26" strokeLinecap="round" fill="none">
          <path d="M-10 190H610" />
          <path d="M195 -10V390" />
          <path d="M395 -10V390" />
        </g>
        <g stroke="#E4DFD4" strokeWidth="2" strokeDasharray="10 12" fill="none">
          <path d="M0 190H600" />
        </g>
        <text x="40" y="186" fontSize="15" fill="#5D6B67" fontFamily="sans-serif">Перовская ул.</text>
        <g transform="translate(300 150)">
          <path d="M0 40c-22-24-34-38-34-56a34 34 0 0 1 68 0c0 18-12 32-34 56z" fill="#2F6F5E" />
          <circle cx="0" cy="-16" r="12" fill="#FBF8F3" />
        </g>
      </svg>
      <figcaption className="px-5 py-3 text-[0.9rem] text-mute">Схема не в масштабе. Точка — {site.address.street}.</figcaption>
    </figure>
  );
}
