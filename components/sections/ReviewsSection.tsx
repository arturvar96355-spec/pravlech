'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { reviews } from '@/content/reviews';
import { site } from '@/content/site';
import { ButtonLink } from '../ui/Button';
import { SectionHead } from '../ui/SectionHead';
import { Stars } from '../ui/Stars';
import { T } from '../ui/Text';
import { CountUp } from '../motion/CountUp';

export function ReviewsSection() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const go = (n: number) => {
    setDir(n > 0 ? 1 : -1);
    setI((cur) => (cur + n + reviews.length) % reviews.length);
  };
  const r = reviews[i];

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section-y bg-mint-soft">
      <div className="container-x">
        <SectionHead id="reviews-title" eyebrow="Отзывы" title="Что пишут пациенты" />
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:items-center">
          <div className="rounded-[var(--radius-lg)] bg-white p-8 shadow-soft">
            <p className="font-heading text-7xl font-semibold leading-none text-sage"><CountUp to={site.rating.value} decimals={1} /></p>
            <Stars size={26} className="mt-3" />
            <p className="mt-3 text-lg">
              {site.rating.marks}&nbsp;оценок, {site.rating.reviews}&nbsp;отзывов<br />на Яндекс Картах
            </p>
            <ButtonLink className="mt-6" variant="secondary" href={site.address.mapsUrl}>Читать на Яндекс Картах</ButtonLink>
          </div>

          <div>
            <div className="relative min-h-[240px]" aria-live="polite">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.figure
                  key={r.id}
                  custom={dir}
                  initial={reduce ? false : { opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[var(--radius-lg)] bg-white p-7 shadow-soft sm:p-10"
                >
                  <Stars size={20} />
                  <blockquote className="mt-4 font-heading text-[1.35rem] leading-snug sm:text-2xl"><T>{r.text}</T></blockquote>
                  <figcaption className="mt-5 text-mute">
                    {r.author}
                    {r.about && <span className="block text-[0.95rem]">{r.about}</span>}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <p className="text-mute" aria-hidden>{i + 1} / {reviews.length}</p>
              <div className="flex gap-2">
                <button onClick={() => go(-1)} aria-label="Предыдущий отзыв" className="grid h-12 w-12 place-items-center rounded-full border-2 border-sage/25 bg-white text-sage hover:border-sage"><ChevronLeft /></button>
                <button onClick={() => go(1)} aria-label="Следующий отзыв" className="grid h-12 w-12 place-items-center rounded-full border-2 border-sage/25 bg-white text-sage hover:border-sage"><ChevronRight /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
