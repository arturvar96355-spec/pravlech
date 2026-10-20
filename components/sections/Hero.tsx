'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { doctors, featuredHeroDoctors } from '@/content/doctors';
import { site } from '@/content/site';
import { typograph } from '@/lib/typograph';
import { Cardiogram } from '../motion/Cardiogram';
import { CountUp } from '../motion/CountUp';
import { Magnetic } from '../motion/Magnetic';
import { SplitLines } from '../motion/SplitLines';
import { Blob } from '../ui/Blob';
import { Button, ButtonLink } from '../ui/Button';
import { Monogram } from '../ui/Monogram';
import { Stars } from '../ui/Stars';
import { T } from '../ui/Text';
import { useBooking } from '../widgets/BookingProvider';

const EASE = [0.22, 1, 0.36, 1] as const;

const slots = [
  { cls: 'left-0 top-0 sm:left-6', speed: -40, d: '6s', delay: '0s' },
  { cls: 'right-0 top-[132px] sm:top-[150px]', speed: -90, d: '7s', delay: '-2s' },
  { cls: 'left-3 top-[268px] sm:left-14 sm:top-[300px]', speed: -20, d: '5s', delay: '-3.5s' },
] as const;

export function Hero() {
  const { openBooking } = useBooking();
  const reduce = useReducedMotion();
  const [lineDone, setLineDone] = useState(false);
  const collageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: collageRef, offset: ['start end', 'end start'] });
  const y0 = useTransform(scrollYProgress, [0, 1], [30, slots[0].speed]);
  const y1 = useTransform(scrollYProgress, [0, 1], [50, slots[1].speed]);
  const y2 = useTransform(scrollYProgress, [0, 1], [20, slots[2].speed]);
  const ys = [y0, y1, y2];
  const blobY = useTransform(scrollYProgress, [0, 1], [-20, 40]);

  const heroDocs = featuredHeroDoctors.map((slug) => doctors.find((d) => d.slug === slug)!);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-10 sm:pt-14 lg:pb-24 lg:pt-20">
      <div className="container-x grid items-start gap-x-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div className="relative z-10 lg:col-start-1 lg:row-start-1">
          <motion.p initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="eyebrow mb-5">
            Медицинский центр · Перово
          </motion.p>
          <h1 id="hero-title" className="text-[clamp(2.5rem,7.2vw,4.4rem)] leading-[1.04]">
            <SplitLines lines={['Врачи, которые', 'объясняют']} />
          </h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="mt-6 max-w-xl text-[1.15rem] text-mute sm:text-xl"
          >
            {typograph('Многопрофильный медицинский центр в Перово. Без лишних анализов и очередей')}
          </motion.p>

        </div>

        <div className="relative my-8 h-14 text-sage/80 sm:h-16 lg:col-span-2 lg:col-start-1 lg:row-start-2" aria-hidden>
          <div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2">
            <Cardiogram className="h-full w-full" delay={0.6} duration={1.4} onDone={() => setLineDone(true)} />
          </div>
        </div>

        <div className="relative z-10 lg:col-start-1 lg:row-start-3">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            className="inline-flex flex-wrap items-center gap-x-5 gap-y-2 rounded-[var(--radius-card)] bg-white px-6 py-4 shadow-soft"
          >
            <span className="flex items-baseline gap-2">
              <span className="font-heading text-5xl font-semibold leading-none text-sage">
                <CountUp to={site.rating.value} decimals={1} />
              </span>
              <Stars size={22} />
            </span>
            <span className="text-[1.02rem] leading-snug">
              <b className="font-heading font-semibold"><CountUp to={site.rating.marks} />&nbsp;оценок</b>
              <br />на Яндекс Картах
            </span>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05, ease: EASE }}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <div className="relative">
              <Magnetic>
                <Button size="lg" className="w-full sm:w-auto" onClick={() => openBooking()}>Записаться к врачу</Button>
              </Magnetic>
              <motion.span
                aria-hidden
                initial={false}
                animate={{ scaleX: lineDone || reduce ? 1 : 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="pointer-events-none absolute -bottom-2.5 left-8 right-8 h-1 origin-left rounded-full bg-peach"
              />
            </div>
            <ButtonLink href="#triage" variant="secondary" size="lg">Подобрать врача</ButtonLink>
          </motion.div>
        </div>

        {/* коллаж из карточек врачей */}
        <div ref={collageRef} className="relative mx-auto mt-10 h-[420px] lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-0 w-full max-w-[460px] sm:h-[500px] lg:mx-0 lg:h-[540px]">
          <motion.div style={reduce ? undefined : { y: blobY }} className="absolute inset-0">
            <Blob variant={1} className="h-full w-full text-mint" />
          </motion.div>
          {heroDocs.map((d, i) => (
            <motion.div
              key={d.slug}
              style={reduce ? undefined : { y: ys[i] }}
              className={`absolute w-[250px] sm:w-[280px] ${slots[i].cls}`}
            >
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.7 + i * 0.18, ease: EASE }}
              >
                <div
                  className="float-y flex items-center gap-4 rounded-[var(--radius-card)] bg-white/95 p-4 shadow-lift"
                  style={{ ['--float-d' as string]: slots[i].d, ['--float-delay' as string]: slots[i].delay }}
                >
                  <Monogram initials={d.initials} index={i} size="sm" />
                  <div className="min-w-0">
                    <p className="font-heading font-medium leading-tight"><T>{d.name}</T></p>
                    <p className="mt-0.5 text-[0.9rem] leading-snug text-mute"><T>{d.specialty}</T></p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
