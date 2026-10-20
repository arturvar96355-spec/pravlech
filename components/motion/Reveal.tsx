'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode, ElementType } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Мягкое появление при входе во вьюпорт: opacity + сдвиг, без blur, один раз. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article' | 'p';
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as as 'div'] as ElementType;
  if (reduce) return <Tag className={className}>{children}</Tag>;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
