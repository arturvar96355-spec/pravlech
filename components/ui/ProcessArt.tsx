/** Линейные иллюстрации шагов приёма (SVG, 400×300). */
const S = { fill: 'none', stroke: '#2F6F5E', strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

function Frame({ children, tint = '#DCEEE6' }: { children: React.ReactNode; tint?: string }) {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-hidden>
      <path d="M338 70c40 38 38 112-6 150s-132 52-198 20S34 150 66 92 150 22 220 28s84 6 118 42z" fill={tint} />
      {children}
    </svg>
  );
}

export const processArt: Array<() => React.ReactElement> = [
  // 1. запись: телефон и календарь
  () => (
    <Frame>
      <rect x="140" y="50" width="120" height="200" rx="22" {...S} fill="#fff" />
      <path d="M180 66h40" {...S} />
      <rect x="158" y="96" width="84" height="66" rx="10" {...S} />
      <path d="M158 116h84M180 90v12M220 90v12" {...S} />
      <path d="M176 140l10 10 20-20" {...S} stroke="#9A4A1D" />
      <circle cx="200" cy="222" r="10" {...S} />
      <path d="M290 100c22 6 32 26 30 46M298 82c34 8 52 38 48 70" {...S} strokeWidth={2.4} opacity={0.5} />
    </Frame>
  ),
  // 2. без очереди: пустые стулья и часы
  () => (
    <Frame tint="#F4D9C6">
      <circle cx="200" cy="96" r="42" {...S} fill="#fff" />
      <path d="M200 70v28l18 12" {...S} />
      <path d="M92 236h216" {...S} />
      {[100, 190, 252].map((x) => (
        <g key={x}>
          <path d={`M${x} 176v60M${x + 44} 196v40M${x} 196h44M${x} 176h12`} {...S} />
          <path d={`M${x + 6} 196v-20`} {...S} />
        </g>
      ))}
    </Frame>
  ),
  // 3. врач слушает и объясняет: два диалоговых облачка и стетоскоп
  () => (
    <Frame>
      <path d="M70 70h150a14 14 0 0 1 14 14v56a14 14 0 0 1-14 14h-86l-32 26v-26H70a14 14 0 0 1-14-14V84a14 14 0 0 1 14-14z" {...S} fill="#fff" />
      <path d="M88 96h104M88 118h70" {...S} />
      <path d="M250 150h70a14 14 0 0 1 14 14v40a14 14 0 0 1-14 14h-8v22l-26-22h-36a14 14 0 0 1-14-14v-40a14 14 0 0 1 14-14z" {...S} fill="#fff" />
      <path d="M262 176h54M262 196h34" {...S} stroke="#9A4A1D" />
      <path d="M130 196v22a22 22 0 0 0 44 0v-22" {...S} strokeWidth={2.6} />
      <circle cx="152" cy="236" r="0" />
    </Frame>
  ),
  // 4. назначает только нужное: планшет с короткой отметкой
  () => (
    <Frame tint="#F4D9C6">
      <rect x="116" y="44" width="168" height="212" rx="18" {...S} fill="#fff" />
      <rect x="170" y="34" width="60" height="22" rx="8" {...S} fill="#fff" />
      <path d="M142 112l12 12 22-24M196 112h66" {...S} />
      <path d="M142 168h16M176 168h86M142 212h16M176 212h60" {...S} opacity={0.35} />
      <path d="M142 190l12 12 22-24M196 190h66" {...S} stroke="#9A4A1D" opacity={0} />
    </Frame>
  ),
  // 5. результаты: бланк с кардиограммой
  () => (
    <Frame>
      <path d="M118 44h124l40 40v172H118z" {...S} fill="#fff" />
      <path d="M242 44v40h40" {...S} />
      <path d="M142 134h30l12-28 20 56 14-36 10 8h30" {...S} stroke="#9A4A1D" />
      <path d="M142 190h116M142 214h80" {...S} opacity={0.4} />
    </Frame>
  ),
];
