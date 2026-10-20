'use client';

import { useEffect, type ReactNode } from 'react';
import type Lenis from 'lenis';
import { loadScrollLibs } from '@/lib/scroll';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Плавная прокрутка Lenis, синхронизированная с ScrollTrigger через gsap.ticker. Грузится после первой отрисовки. */
export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const start = async () => {
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([import('lenis'), loadScrollLibs()]);
      if (cancelled) return;
      const lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: { offset: -80 } });
      window.__lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        delete window.__lenis;
      };
    };

    const idle = 'requestIdleCallback' in window;
    const id = idle ? window.requestIdleCallback(() => void start(), { timeout: 2500 }) : window.setTimeout(() => void start(), 1500);

    return () => {
      cancelled = true;
      if (idle) window.cancelIdleCallback(id);
      else clearTimeout(id);
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
