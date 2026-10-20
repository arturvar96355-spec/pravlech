'use client';

import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { getDoctor } from '@/content/doctors';
import { mentionStats, statsNote, themeStats } from '@/content/reviewStats';
import { reviews, reviewSource, type Review } from '@/content/reviews';
import { cn } from '@/lib/utils';
import { CountUp } from '../motion/CountUp';
import { Reveal } from '../motion/Reveal';
import { DoctorAvatar } from '../ui/DoctorAvatar';
import { T } from '../ui/Text';

type Pick = { kind: 'topic'; id: string } | { kind: 'doctor'; id: string } | null;

/** Крупные числа по темам и карточки врачей по числу упоминаний. Нажатие показывает цитаты. */
export function ReviewNumbers() {
  const [pick, setPick] = useState<Pick>({ kind: 'topic', id: 'explain' });

  const shown: Review[] = useMemo(() => {
    if (!pick) return [];
    return reviews.filter((r) => (pick.kind === 'topic' ? r.topics?.includes(pick.id as never) : r.doctorSlug === pick.id)).slice(0, 4);
  }, [pick]);

  const doctor = pick?.kind === 'doctor' ? getDoctor(pick.id) : undefined;
  const toggle = (p: NonNullable<Pick>) => setPick((cur) => (cur && cur.kind === p.kind && cur.id === p.id ? null : p));
  const title = pick?.kind === 'topic' ? themeStats.find((t) => t.id === pick.id)?.label : mentionStats.find((m) => m.slug === pick?.id)?.label;

  return (
    <div className="space-y-14">
      <Reveal>
        <h2 className="mb-5 text-2xl">О чём пишут</h2>
        <ul className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-3">
          {themeStats.map((t) => {
            const active = pick?.kind === 'topic' && pick.id === t.id;
            return (
              <li key={t.id}>
                <button
                  onClick={() => toggle({ kind: 'topic', id: t.id })}
                  aria-pressed={active}
                  className={cn('flex h-full w-full flex-col rounded-[var(--radius-lg)] p-6 text-left shadow-soft transition-colors', active ? 'bg-mint' : 'bg-white hover:bg-mint-soft')}
                >
                  <span className="font-heading text-6xl font-semibold leading-none text-sage-dark">
                    ≈&nbsp;<CountUp to={t.value} />
                  </span>
                  <span className="mt-1 text-[0.9rem] text-mute">из&nbsp;150 отзывов</span>
                  <span className="mt-4 font-heading text-lg font-medium">{t.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </Reveal>

      <Reveal>
        <h2 className="mb-5 text-2xl">Кого называют</h2>
        <ul className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mentionStats.map((m, i) => {
            const d = getDoctor(m.slug);
            if (!d) return null;
            const active = pick?.kind === 'doctor' && pick.id === m.slug;
            const none = m.value === 0;
            return (
              <li key={m.slug}>
                <button
                  onClick={() => toggle({ kind: 'doctor', id: m.slug })}
                  disabled={none}
                  aria-pressed={active}
                  className={cn(
                    'flex w-full items-center gap-4 rounded-[var(--radius-lg)] p-4 text-left shadow-soft transition-colors',
                    active ? 'bg-mint' : 'bg-white hover:bg-mint-soft',
                    none && 'cursor-default opacity-70 hover:bg-white',
                  )}
                >
                  <DoctorAvatar doctor={d} index={i} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-heading font-medium leading-snug">{m.label}</span>
                    <span className="block text-[0.9rem] text-mute">{d.specialty}</span>
                  </span>
                  <span className="text-right">
                    <span className="block font-heading text-3xl font-semibold leading-none text-sage-dark">{m.display ?? m.value}</span>
                    <span className="block text-[0.8rem] text-mute">из&nbsp;150</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Reveal>

      <div aria-live="polite" className="min-h-[120px]">
        <AnimatePresence mode="wait">
          {pick && (
            <motion.div key={`${pick.kind}-${pick.id}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="rounded-[var(--radius-lg)] bg-white p-6 shadow-soft sm:p-8">
              <h3 className="text-xl">{title}</h3>
              {shown.length ? (
                <ul className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-2">
                  {shown.map((r) => (
                    <li key={r.id}>
                      <figure>
                        <blockquote className="font-heading text-[1.1rem] leading-snug"><T>{`«${r.text}»`}</T></blockquote>
                        <figcaption className="mt-1 text-[0.9rem] text-mute">{reviewSource} · {r.author}{r.date ? `, ${r.date}` : ''}</figcaption>
                      </figure>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-mute"><T>[цитата из отзыва на Яндекс Картах — подобрать]</T></p>
              )}
              {doctor && (
                <p className="mt-4">
                  <Link href={`/doctors/${doctor.slug}/`} className="link-u font-heading font-medium text-sage">Профиль врача: {doctor.name} →</Link>
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-[0.9rem] text-mute">{statsNote} Цитаты нужно сверить с оригиналом перед публикацией.</p>
    </div>
  );
}
