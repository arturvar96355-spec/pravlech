'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { getDoctor } from '@/content/doctors';
import { mentionStats, statsNote, themeStats } from '@/content/reviewStats';
import { reviews, reviewSource, type Review } from '@/content/reviews';
import { cn } from '@/lib/utils';
import { Reveal } from '../motion/Reveal';
import { SectionHead } from '../ui/SectionHead';
import { T } from '../ui/Text';

type Pick = { kind: 'topic'; id: string } | { kind: 'doctor'; id: string } | null;

function Bar({
  label,
  value,
  display,
  max,
  active,
  disabled,
  onClick,
  approx,
}: {
  label: string;
  value: number;
  display?: string;
  max: number;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  approx?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <li>
      <button
        onClick={onClick}
        disabled={disabled}
        aria-pressed={active}
        className={cn(
          'group grid min-h-12 w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 rounded-[var(--radius-md)] px-3 py-2 text-left transition-colors',
          active ? 'bg-mint' : 'hover:bg-mint-soft',
          disabled && 'cursor-default opacity-70 hover:bg-transparent',
        )}
      >
        <span className="font-medium">{label}</span>
        <span className="font-heading text-lg font-semibold tabular-nums text-sage-dark">
          {approx ? '≈ ' : ''}{display ?? value}
        </span>
        <span className="col-span-2 h-2.5 overflow-hidden rounded-r-[4px] bg-transparent" aria-hidden>
          <motion.span
            className={cn('block h-full origin-left rounded-r-[4px]', active ? 'bg-sage-dark' : 'bg-sage')}
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: `${Math.max(value === 0 ? 0 : 2, (value / max) * 100)}%` }}
          />
        </span>
      </button>
    </li>
  );
}

export function ReviewStats() {
  const [pick, setPick] = useState<Pick>({ kind: 'topic', id: 'explain' });

  const shown: Review[] = useMemo(() => {
    if (!pick) return [];
    return reviews.filter((r) => (pick.kind === 'topic' ? r.topics?.includes(pick.id as never) : r.doctorSlug === pick.id)).slice(0, 4);
  }, [pick]);

  const doctor = pick?.kind === 'doctor' ? getDoctor(pick.id) : undefined;
  const toggle = (p: NonNullable<Pick>) => setPick((cur) => (cur && cur.kind === p.kind && cur.id === p.id ? null : p));
  const title =
    pick?.kind === 'topic'
      ? themeStats.find((t) => t.id === pick.id)?.label
      : mentionStats.find((m) => m.slug === pick?.id)?.label;

  return (
    <section aria-labelledby="stats-title" className="section-y">
      <div className="container-x">
        <SectionHead
          id="stats-title"
          eyebrow="Отзывы в цифрах"
          title="О чём пишут и кого *называют*"
          lead="Нажмите на строку, чтобы прочитать отзывы по теме или о враче."
        />

        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h3 className="mb-3 text-xl">О чём пишут</h3>
            <ul className="space-y-1">
              {themeStats.map((t) => (
                <Bar key={t.id} label={t.label} value={t.value} approx max={40} active={pick?.kind === 'topic' && pick.id === t.id} onClick={() => toggle({ kind: 'topic', id: t.id })} />
              ))}
            </ul>
            <p className="mt-2 px-3 text-[0.88rem] text-mute">Сколько отзывов из 150 говорят об этом.</p>
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className="mb-3 text-xl">Кого называют</h3>
            <ul className="space-y-1">
              {mentionStats.map((m) => (
                <Bar
                  key={m.slug}
                  label={m.label}
                  value={m.value}
                  display={m.display}
                  max={51}
                  disabled={m.value === 0}
                  active={pick?.kind === 'doctor' && pick.id === m.slug}
                  onClick={() => toggle({ kind: 'doctor', id: m.slug })}
                />
              ))}
            </ul>
            <p className="mt-2 px-3 text-[0.88rem] text-mute">Сколько из 150 просмотренных отзывов называют врача.</p>
          </Reveal>
        </div>

        <div aria-live="polite" className="mt-8 min-h-[120px]">
          <AnimatePresence mode="wait">
            {pick && (
              <motion.div key={`${pick.kind}-${pick.id}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="rounded-[var(--radius-lg)] bg-white p-6 shadow-soft sm:p-8">
                <h3 className="text-xl">{title}</h3>
                {shown.length ? (
                  <ul className="mt-4 grid gap-4 md:grid-cols-2">
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

        <p className="mt-6 text-[0.9rem] text-mute">{statsNote} Цитаты нужно сверить с оригиналом перед публикацией.</p>
      </div>
    </section>
  );
}
