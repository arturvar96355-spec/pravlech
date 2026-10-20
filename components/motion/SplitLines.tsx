/** Заголовок по строкам: маска снизу вверх, stagger 120 мс. Чистый CSS — стартует без ожидания гидрации (важно для LCP). */
export function SplitLines({ lines, className, delay = 0.05, markLast = false }: { lines: string[]; className?: string; delay?: number; markLast?: boolean }) {
  return (
    <span className={className}>
      <span className="sr-only">{lines.join(' ')}</span>
      {lines.map((line, i) => (
        <span key={i} aria-hidden className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
          <span className="line-up block" style={{ animationDelay: `${delay + i * 0.12}s` }}>
            {markLast && i === lines.length - 1 ? <span className="marker">{line}</span> : line}
          </span>
        </span>
      ))}
    </span>
  );
}
