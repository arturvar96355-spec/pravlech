'use client';

import { motion, useReducedMotion } from 'motion/react';

/** Фирменный мотив: линия-кардиограмма, прорисовывается через pathLength. */
export function Cardiogram({
  className,
  duration = 1.4,
  delay = 0,
  onDone,
  strokeWidth = 3,
  d = 'M0 40 H220 L238 40 L252 12 L270 68 L286 40 H420 L436 40 L448 22 L462 56 L474 40 H700 L716 40 L728 6 L746 74 L762 40 H1000',
}: {
  className?: string;
  duration?: number;
  delay?: number;
  onDone?: () => void;
  strokeWidth?: number;
  d?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 1000 80" preserveAspectRatio="none" className={className} aria-hidden fill="none">
      <motion.path
        d={d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduce ? 0 : duration, delay, ease: [0.65, 0, 0.35, 1] }}
        onAnimationComplete={onDone}
      />
    </svg>
  );
}
