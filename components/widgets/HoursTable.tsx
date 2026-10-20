'use client';

import { useEffect, useState } from 'react';
import { hours } from '@/content/site';
import { moscowNow } from '@/lib/schedule';
import { cn } from '@/lib/utils';

export function HoursTable() {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(moscowNow().day), []);
  return (
    <table className="w-full text-left">
      <caption className="sr-only">Режим работы</caption>
      <tbody>
        {hours.map((h) => {
          const on = today === h.day;
          return (
            <tr key={h.day} aria-current={on ? 'date' : undefined} className={cn('border-b border-line last:border-0', on && 'bg-mint font-medium')}>
              <th scope="row" className={cn('rounded-l-2xl px-4 py-3 font-normal', on && 'font-medium text-sage-dark')}>
                {h.long}
                {on && <span className="ml-2 rounded-full bg-sage px-2 py-0.5 text-xs text-white">сегодня</span>}
              </th>
              <td className="rounded-r-2xl px-4 py-3 text-right">{h.open}:00–{h.close}:00</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
