import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Badge({ children, tone = 'mint', className }: { children: ReactNode; tone?: 'mint' | 'peach' | 'white'; className?: string }) {
  const tones = {
    mint: 'bg-mint text-sage-dark',
    peach: 'bg-peach text-peach-deep',
    white: 'bg-white text-ink shadow-soft',
  } as const;
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[0.95rem] font-medium', tones[tone], className)}>
      {children}
    </span>
  );
}
