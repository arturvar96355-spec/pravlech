'use client';

import { Contrast, Eye, Minus, Plus, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const KEY = 'pravlech-a11y';
type Prefs = { fs: 0 | 1 | 2; hc: boolean };
const DEFAULT: Prefs = { fs: 0, hc: false };

function apply(p: Prefs) {
  const r = document.documentElement;
  r.dataset.fs = String(p.fs);
  r.dataset.contrast = p.hc ? 'high' : 'normal';
}

function load(): Prefs {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw) as Partial<Prefs>;
      return { fs: p.fs === 1 || p.fs === 2 ? p.fs : 0, hc: !!p.hc };
    }
  } catch {
    /* хранилище недоступно — работаем без него */
  }
  return DEFAULT;
}

/** Настройки для слабовидящих: размер текста и контраст. Значения хранятся в браузере. */
export function A11yPanel({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => setPrefs(load()), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  const update = (next: Prefs) => {
    setPrefs(next);
    apply(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* без сохранения */
    }
  };

  const btn =
    'grid h-12 min-w-12 place-items-center rounded-full border-2 border-line bg-white px-3 font-heading font-medium transition-colors hover:border-sage disabled:opacity-40';

  return (
    <div ref={box} className={cn('relative', className)}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label="Настройки для слабовидящих: размер текста и контраст"
        className="grid h-12 w-12 place-items-center rounded-full bg-mint text-sage transition-colors hover:bg-[#cde5da]"
      >
        <Eye size={22} aria-hidden />
      </button>
      {open && (
        <div id="a11y-panel" role="group" aria-label="Настройки для слабовидящих" className="absolute right-0 top-14 z-[60] w-[min(20rem,calc(100vw-2rem))] rounded-[var(--radius-card)] bg-white p-5 text-ink shadow-lift">
          <p className="font-heading text-lg font-medium">Для слабовидящих</p>
          <div className="mt-4">
            <p className="mb-2 text-[0.95rem] text-mute">Размер текста</p>
            <div className="flex gap-2">
              <button className={btn} aria-label="Уменьшить текст" disabled={prefs.fs === 0} onClick={() => update({ ...prefs, fs: (prefs.fs - 1) as Prefs['fs'] })}>
                <Minus size={18} aria-hidden />
              </button>
              <span className="grid flex-1 place-items-center rounded-full bg-mint-soft font-heading" aria-live="polite">
                {['Обычный', 'Крупный', 'Очень крупный'][prefs.fs]}
              </span>
              <button className={btn} aria-label="Увеличить текст" disabled={prefs.fs === 2} onClick={() => update({ ...prefs, fs: (prefs.fs + 1) as Prefs['fs'] })}>
                <Plus size={18} aria-hidden />
              </button>
            </div>
          </div>
          <button
            role="switch"
            aria-checked={prefs.hc}
            onClick={() => update({ ...prefs, hc: !prefs.hc })}
            className={cn('mt-4 flex min-h-12 w-full items-center justify-between gap-3 rounded-full border-2 px-4 font-medium transition-colors', prefs.hc ? 'border-sage bg-sage text-white' : 'border-line bg-white hover:border-sage')}
          >
            <span className="flex items-center gap-2"><Contrast size={18} aria-hidden /> Высокий контраст</span>
            <span>{prefs.hc ? 'Вкл' : 'Выкл'}</span>
          </button>
          <button onClick={() => update(DEFAULT)} className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-[0.95rem] text-sage hover:bg-mint">
            <RotateCcw size={16} aria-hidden /> Сбросить
          </button>
        </div>
      )}
    </div>
  );
}
