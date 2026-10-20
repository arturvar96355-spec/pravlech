'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { processSteps } from '@/content/process';
import { cn } from '@/lib/utils';
import { processArt } from '../ui/ProcessArt';
import { Reveal } from '../motion/Reveal';
import { typograph } from '@/lib/typograph';

/** Кардиограмма-связка: вертикальная линия с «ударами» между шагами. */
const ECG_PATH = (() => {
  // 5 шагов по 100 по высоте; импульс в центре каждой строки
  let d = 'M20 0 V36';
  for (let i = 0; i < 5; i++) {
    const yc = 50 + i * 100;
    d += ` L20 ${yc - 14} L32 ${yc - 4} L8 ${yc + 10} L20 ${yc + 20}`;
    if (i < 4) d += ` V${yc + 86}`;
  }
  return d;
})();

export function ProcessScene() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const scene = sceneRef.current;
      const path = pathRef.current;
      if (!scene || !path) return;
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      const st = ScrollTrigger.create({
        trigger: scene,
        start: 'top top+=72',
        end: () => `+=${Math.round(window.innerHeight * 2.2)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.4,
        anticipatePin: 1,
        onUpdate: (self) => {
          gsap.set(path, { strokeDashoffset: len * (1 - Math.min(1, self.progress * 1.05)) });
          const idx = Math.min(processSteps.length - 1, Math.floor(self.progress * processSteps.length));
          setActive((a) => (a === idx ? a : idx));
        },
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, [reduce]);

  return (
    <section aria-labelledby="process-title" className="bg-mint-soft">
      {/* десктоп: pin-сцена */}
      <div ref={sceneRef} className="hidden min-h-[calc(100svh-72px)] items-center md:flex">
        <div className="container-x grid w-full grid-cols-[1fr_1fr] items-center gap-10 py-10 lg:gap-20">
          <div>
            <p className="eyebrow mb-3">Как проходит приём</p>
            <h2 id="process-title" className="mb-8 text-[clamp(2rem,3.6vw,3rem)]">Пять спокойных шагов</h2>
            <div className="relative">
              <svg viewBox="0 0 40 500" className="absolute -left-1 top-0 hidden h-[500px] w-10 lg:block" aria-hidden fill="none" preserveAspectRatio="none">
                <path d={ECG_PATH} stroke="#DCEEE6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path ref={pathRef} d={ECG_PATH} stroke="#2F6F5E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <ol className="lg:pl-14">
                {processSteps.map((s, i) => (
                  <li key={s.n} aria-current={i === active ? 'step' : undefined} className={cn('flex h-[100px] items-center gap-5 transition-opacity duration-500', i === active ? 'opacity-100' : 'opacity-40')}>
                    <span className="relative grid h-16 w-16 shrink-0 place-items-center">
                      {i === active && <span className="beat-ring absolute inset-0 rounded-full bg-sage/30" aria-hidden />}
                      <span className={cn('relative grid h-14 w-14 place-items-center rounded-full font-heading text-2xl font-semibold transition-colors duration-500', i === active ? 'bg-sage text-white' : 'bg-white text-sage')}>{s.n}</span>
                    </span>
                    <span>
                      <span className="block font-heading text-[1.25rem] font-medium leading-tight lg:text-[1.4rem]">{typograph(s.title)}</span>
                      <span className={cn('block overflow-hidden text-[1rem] text-mute transition-[max-height,opacity] duration-500', i === active ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0')}>{typograph(s.text)}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full max-w-[560px] justify-self-center" aria-hidden>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {processArt[active]()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* мобильный: вертикальные карточки */}
      <div className="container-x section-y md:hidden">
        <p className="eyebrow mb-3">Как проходит приём</p>
        <h2 className="mb-8 text-[1.9rem]">Пять спокойных шагов</h2>
        <ol className="space-y-4">
          {processSteps.map((s, i) => (
            <Reveal as="li" key={s.n} className="rounded-[var(--radius-card)] bg-white p-5 shadow-soft">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sage font-heading text-xl font-semibold text-white">{s.n}</span>
                <h3 className="text-lg leading-tight">{typograph(s.title)}</h3>
              </div>
              <div className="mx-auto mt-3 h-36 max-w-[220px]" aria-hidden>{processArt[i]()}</div>
              <p className="mt-2 text-mute">{typograph(s.text)}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
