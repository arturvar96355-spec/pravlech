/** Иллюстрация вместо фото центра: светлый кабинет, окно, стетоскоп. */
export function RoomScene({ className }: { className?: string }) {
  const S = { fill: 'none', stroke: '#2F6F5E', strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  return (
    <svg viewBox="0 0 560 380" className={className} role="img" aria-label="Иллюстрация: светлый кабинет с окном">
      <rect width="560" height="380" rx="32" fill="#F4D9C6" opacity="0.55" />
      <rect x="40" y="36" width="230" height="200" rx="22" {...S} fill="#fff" />
      <path d="M155 36v200M40 136h230" {...S} />
      <g stroke="#E8B77D" strokeWidth="3" strokeLinecap="round" opacity="0.8">
        <path d="M300 60l60-24M300 100l78-10M300 140l70 20" />
      </g>
      <circle cx="312" cy="44" r="26" fill="#F7E1A8" />
      <path d="M40 290h480" {...S} />
      <path d="M90 290v60M470 290v60" {...S} />
      <rect x="300" y="238" width="190" height="52" rx="12" {...S} fill="#fff" />
      <path d="M340 238v-60a30 30 0 0 1 60 0v60" {...S} />
      <path d="M150 262a34 34 0 0 0 68 0v-36" {...S} strokeWidth={3.4} />
      <circle cx="150" cy="224" r="7" {...S} fill="#fff" />
      <circle cx="218" cy="222" r="7" {...S} fill="#fff" />
      <path d="M184 296v14" {...S} />
      <circle cx="184" cy="324" r="14" {...S} fill="#DCEEE6" />
      <path d="M444 238v-40M444 198c-18-6-28-22-26-40 18 4 28 18 26 40zM444 198c18-6 28-22 26-40-18 4-28 18-26 40z" {...S} fill="#DCEEE6" />
    </svg>
  );
}
