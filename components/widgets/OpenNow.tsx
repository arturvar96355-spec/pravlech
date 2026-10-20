'use client';

import { useEffect, useState } from 'react';
import { openStatus, type OpenStatus } from '@/lib/schedule';
import { cn } from '@/lib/utils';

export function OpenNow({ className }: { className?: string }) {
  const [status, setStatus] = useState<OpenStatus | null>(null);
  useEffect(() => {
    const update = () => setStatus(openStatus());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={cn('inline-flex items-center gap-2 whitespace-nowrap text-[0.95rem] font-medium', className)} aria-live="polite">
      <span className="relative grid h-2.5 w-2.5 place-items-center" aria-hidden>
        {status?.open && <span className="beat-ring absolute inset-[-4px] rounded-full bg-sage" />}
        <span className={cn('h-2.5 w-2.5 rounded-full', status ? (status.open ? 'bg-sage' : 'bg-[#a79d8b]') : 'bg-line')} />
      </span>
      <span>{status ? status.text : 'Пн–пт 8:00–21:00'}</span>
    </span>
  );
}
