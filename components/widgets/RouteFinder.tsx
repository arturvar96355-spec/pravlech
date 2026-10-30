'use client';

import { useState } from 'react';
import { howToGet } from '@/content/site';
import { cn } from '@/lib/utils';

/** «Откуда едете»: выбор станции и подсказка маршрута. */
export function RouteFinder() {
  const [id, setId] = useState<string>(howToGet[0].id);
  const route = howToGet.find((r) => r.id === id)!;

  return (
    <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-soft">
      <h3 className="text-xl">Как добраться</h3>
      <p className="mt-1 text-[0.95rem] text-mute">Откуда Вы едете?</p>
      <div role="group" aria-label="Откуда Вы едете" className="mt-3 flex flex-wrap gap-2">
        {howToGet.map((r) => (
          <button
            key={r.id}
            aria-pressed={id === r.id}
            onClick={() => setId(r.id)}
            className={cn('min-h-11 rounded-full border-2 px-4 font-medium transition-colors', id === r.id ? 'border-sage bg-sage text-white' : 'border-line bg-white hover:border-sage')}
          >
            {r.short}
          </button>
        ))}
      </div>
      <p className="mt-4 rounded-[var(--radius-md)] bg-mint-soft p-4" aria-live="polite">
        <b className="font-heading font-medium">{route.from}:</b> {route.how}.
      </p>
    </div>
  );
}
