import { cn } from '@/lib/utils';

/**
 * Мягкая волна на верхней границе цветной секции.
 * `tone` — цвет соседней секции сверху (то, что «вдавливается» в эту).
 */
export function WaveTop({ tone = 'cream', className }: { tone?: 'cream' | 'mint-soft' | 'sage-dark'; className?: string }) {
  const fill = { cream: 'text-cream', 'mint-soft': 'text-mint-soft', 'sage-dark': 'text-sage-dark' }[tone];
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className={cn('pointer-events-none absolute inset-x-0 top-0 block h-6 w-full sm:h-10', fill, className)}
    >
      <path d="M0 0H1440V14C1260 44 1080 6 900 22S540 46 360 24 90 4 0 22Z" fill="currentColor" />
    </svg>
  );
}
