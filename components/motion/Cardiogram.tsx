'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

/** Путь в пикселях: ровная линия и «удары» через равные промежутки. */
function buildPath(w: number, h: number, step: number): string {
  const mid = h / 2;
  const amp = h * 0.42;
  let d = `M0 ${mid}`;
  let x = Math.max(80, step * 0.45);
  while (x + 70 < w) {
    d += ` H${x} L${x + 14} ${mid - amp * 0.35} L${x + 24} ${mid} L${x + 38} ${mid - amp} L${x + 56} ${mid + amp} L${x + 70} ${mid}`;
    x += step;
  }
  return d + ` H${w}`;
}

/**
 * Фирменный мотив: линия-кардиограмма во всю ширину родителя.
 * Прорисовывается через pathLength за `duration` секунд.
 */
export function Cardiogram({
  className,
  duration = 1.4,
  delay = 0,
  onDone,
  strokeWidth = 3,
  step = 360,
}: {
  className?: string;
  duration?: number;
  delay?: number;
  onDone?: () => void;
  strokeWidth?: number;
  step?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setSize({ w: Math.round(el.clientWidth), h: Math.round(el.clientHeight) });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (reduce && size) onDone?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, !!size]);

  return (
    <div ref={ref} className={className} aria-hidden>
      {size && (
        <svg width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`} fill="none" className="block overflow-visible">
          <motion.path
            key={`${size.w}x${size.h}`}
            d={buildPath(size.w, size.h, step)}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: reduce ? 0 : duration, delay, ease: [0.65, 0, 0.35, 1] }}
            onAnimationComplete={onDone}
          />
        </svg>
      )}
    </div>
  );
}
