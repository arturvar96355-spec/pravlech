'use client';

import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { doctors } from '@/content/doctors';
import { getService } from '@/content/services';
import { triage, triageDisclaimer } from '@/content/triage';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';
import { ServiceIcon } from '../ui/Icons';
import { T } from '../ui/Text';
import { useBooking } from './BookingProvider';

export function Triage() {
  const [active, setActive] = useState<string | null>(null);
  const { openBooking } = useBooking();
  const option = triage.find((t) => t.id === active);
  const service = option ? getService(option.serviceId) : undefined;
  const people = service?.specialtyId ? doctors.filter((d) => d.named && d.specialtyId === service.specialtyId) : [];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
      <div>
        <div role="group" aria-label="С чем Вы пришли" className="flex flex-wrap gap-3">
          {triage.map((t) => (
            <button
              key={t.id}
              aria-pressed={active === t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                'min-h-12 rounded-full border-2 px-5 py-2 text-left font-medium transition-[background-color,border-color,transform] duration-200 active:scale-[0.98]',
                active === t.id ? 'border-sage bg-sage text-white' : 'border-transparent bg-white shadow-soft hover:border-sage',
              )}
            >
              <T>{t.chip}</T>
            </button>
          ))}
        </div>
        <p className="mt-6 max-w-xl text-[0.98rem] text-mute"><T>{triageDisclaimer}</T></p>
      </div>

      <div aria-live="polite" className="min-h-[260px]">
        <AnimatePresence mode="wait">
          {option && service ? (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[var(--radius-lg)] bg-white p-6 shadow-lift sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-mint text-sage"><ServiceIcon name={service.icon} size={32} /></span>
                <div>
                  <p className="text-[0.9rem] text-mute">Вам к специалисту</p>
                  <h3 className="text-2xl"><T>{service.title}</T></h3>
                </div>
              </div>
              <p className="mt-4"><T>{option.hint}</T></p>
              <p className="mt-3 font-heading text-lg">
                {service.id === 'us' ? 'Цена: ' : 'Приём: '}
                <span className="text-sage"><T>{service.priceText}</T></span>
              </p>
              {people.length > 0 && (
                <p className="mt-3 text-[0.98rem] text-mute">
                  Принимают:{' '}
                  {people.map((p, i) => (
                    <span key={p.slug}>
                      {i > 0 && ', '}
                      <Link href={`/doctors/${p.slug}/`} className="link-u text-sage">{p.name}</Link>
                    </span>
                  ))}
                </p>
              )}
              <Button size="lg" className="mt-6 w-full sm:w-auto" onClick={() => openBooking({ service: service.id })}>
                Записаться
              </Button>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid min-h-[260px] place-items-center rounded-[var(--radius-lg)] border-2 border-dashed border-sage/30 p-8 text-center text-mute">
              <p>Выберите, что Вас беспокоит. Подскажем, к какому специалисту идти.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
