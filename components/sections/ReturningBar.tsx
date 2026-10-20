'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { HeartHandshake, X } from 'lucide-react';
import { getDoctor } from '@/content/doctors';
import { getService } from '@/content/services';
import { forWhomOptions } from '@/lib/booking';
import { useBooking } from '../widgets/BookingProvider';
import { useProfile } from '../widgets/ProfileProvider';

/** «С возвращением»: показывается, только если посетитель сам разрешил запомнить себя на этом устройстве. */
export function ReturningBar() {
  const { profile, ready, forget } = useProfile();
  const { openBooking } = useBooking();
  const reduce = useReducedMotion();

  const doctor = profile?.lastDoctor ? getDoctor(profile.lastDoctor) : undefined;
  const service = !doctor && profile?.lastService ? getService(profile.lastService) : undefined;
  const firstName = profile?.name.split(' ')[0];

  const again = doctor
    ? { label: `Записаться снова: ${doctor.name}`, open: () => openBooking({ doctor: doctor.slug }) }
    : service
      ? { label: `Записаться снова: ${service.title}`, open: () => openBooking({ service: service.id }) }
      : { label: 'Записаться', open: () => openBooking() };

  return (
    <AnimatePresence>
      {ready && profile && (
        <motion.section
          aria-label="Ваши данные на этом устройстве"
          initial={reduce ? false : { height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden bg-mint"
        >
          <div className="container-x flex flex-wrap items-center gap-x-5 gap-y-2 py-3">
            <p className="flex items-center gap-2 font-heading font-medium text-sage-dark">
              <HeartHandshake size={20} aria-hidden /> С возвращением, {firstName}.
            </p>
            <button onClick={again.open} className="min-h-11 rounded-full bg-sage px-5 font-heading font-medium text-white transition-colors hover:bg-sage-dark">
              {again.label}
            </button>
            {profile.people.length > 0 && (
              <p className="text-[0.95rem]">
                Семья:{' '}
                {profile.people
                  .map((p) => `${p.name} (${(forWhomOptions.find((f) => f.id === p.forWhom)?.label ?? '').toLowerCase()})`)
                  .join(', ')}
              </p>
            )}
            <button onClick={forget} className="ml-auto inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-[0.92rem] text-sage-dark hover:bg-white/60" aria-label="Забыть мои данные на этом устройстве">
              <X size={16} aria-hidden /> Забыть меня
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
