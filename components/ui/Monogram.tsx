import { cn } from '@/lib/utils';

const tints = ['bg-mint text-sage-dark', 'bg-peach text-peach-deep', 'bg-[#e6efe0] text-sage-dark'] as const;

/** Плейсхолдер вместо фото сотрудника: монограмма на мягком фоне. */
export function Monogram({ initials, index = 0, className, size = 'md' }: { initials: string; index?: number; className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const dim = { sm: 'h-14 w-14 text-xl', md: 'h-24 w-24 text-3xl', lg: 'h-40 w-40 text-5xl' }[size];
  return (
    <span
      aria-hidden
      className={cn('grid shrink-0 place-items-center rounded-[38%_62%_55%_45%/50%_45%_55%_50%] font-heading font-semibold', tints[index % tints.length], dim, className)}
    >
      {initials}
    </span>
  );
}
