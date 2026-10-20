'use client';

import { animate, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { formatPrice } from '@/lib/typograph';

/** Сумма с плавным пересчётом. */
export function AnimatedPrice({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = formatPrice(value);
      prev.current = value;
      return;
    }
    const c = animate(prev.current, value, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = formatPrice(v);
      },
    });
    prev.current = value;
    return () => c.stop();
  }, [value, reduce]);

  return (
    <span ref={ref} className={className}>
      {formatPrice(value)}
    </span>
  );
}
