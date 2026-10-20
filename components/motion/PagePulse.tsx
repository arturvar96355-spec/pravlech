'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

/** Пик каждые `step` пикселей: ровная линия и удар кардиограммы. */
function path(w: number, h: number, step: number): string {
  const mid = h / 2;
  const amp = h * 0.46;
  let d = `M0 ${mid}`;
  for (let x = step * 0.5; x + 40 < w; x += step) {
    d += ` H${x} L${x + 8} ${mid - amp * 0.4} L${x + 14} ${mid} L${x + 21} ${mid - amp} L${x + 30} ${mid + amp} L${x + 38} ${mid}`;
  }
  return d + ` H${w}`;
}

/**
 * «Пульс страницы»: тонкая кардиограмма под шапкой, прорисовывается по мере прокрутки.
 * Вместо обычной шкалы прогресса. При reduced-motion — статичная бледная линия.
 */
export function PagePulse() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setW(Math.round(el.clientWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const H = 14;
  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-[7px] h-[14px] text-sage">
      {w > 0 && (
        <svg width={w} height={H} viewBox={`0 0 ${w} ${H}`} fill="none" className="block">
          <path d={path(w, H, Math.max(220, w / 6))} stroke="currentColor" strokeOpacity={reduce ? 0.18 : 0.12} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          {!reduce && (
            <motion.path
              d={path(w, H, Math.max(220, w / 6))}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: progress }}
            />
          )}
        </svg>
      )}
    </div>
  );
}
