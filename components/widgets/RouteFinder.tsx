'use client';

import { MapPin } from 'lucide-react';
import { useState } from 'react';
import { howToGet, site } from '@/content/site';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';

const [lat, lon] = site.address.coords;
const mapSrc = `https://yandex.ru/map-widget/v1/?ll=${lon}%2C${lat}&z=16&pt=${lon}%2C${lat}%2Cpm2gnm`;

/** «Откуда едете» + карта Яндекса, которая загружается только по нажатию. */
export function RouteFinder() {
  const [id, setId] = useState<string>(howToGet[0].id);
  const [map, setMap] = useState(false);
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

      <div className="mt-4 overflow-hidden rounded-[var(--radius-md)] bg-mint">
        {map ? (
          <iframe title="Карта: Перовская улица, 66к3" src={mapSrc} loading="lazy" className="block h-[320px] w-full border-0" referrerPolicy="no-referrer-when-downgrade" />
        ) : (
          <div className="grid h-[200px] place-items-center p-4 text-center">
            <div>
              <MapPin className="mx-auto text-sage" aria-hidden />
              <p className="mt-2 text-[0.95rem] text-mute">Карта загрузится с Яндекса после нажатия</p>
              <Button variant="secondary" className="mt-3" onClick={() => setMap(true)}>Показать карту</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
