'use client';

import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { Check, Plus } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { checkupDisclaimer, checkupItems, checkupPresets, presetNote } from '@/content/checkup';
import { ph } from '@/content/placeholders';
import { site } from '@/content/site';
import { formatPrice } from '@/lib/typograph';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';
import { T } from '../ui/Text';
import { AnimatedPrice } from './AnimatedPrice';
import { useBooking } from './BookingProvider';

const SPRING = { type: 'spring', stiffness: 380, damping: 32 } as const;

export function CheckupBuilder({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [weekend, setWeekend] = useState(false);
  const { openBooking } = useBooking();

  const chosen = checkupItems.filter((i) => selected.includes(i.id));
  const calc = useMemo(() => {
    const known = chosen.filter((i) => i.price != null);
    const subtotal = known.reduce((s, i) => s + (i.price ?? 0), 0);
    const discount = weekend
      ? Math.round(known.filter((i) => i.weekendDiscount).reduce((s, i) => s + (i.price ?? 0), 0) * (site.weekendDiscount / 100))
      : 0;
    const unknown = chosen.filter((i) => i.price == null);
    const approx = chosen.some((i) => i.approx);
    const discountPending = weekend && chosen.some((i) => i.weekendDiscount && i.price == null);
    return { subtotal, discount, total: subtotal - discount, unknown, approx, discountPending };
  }, [chosen, weekend]);

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const isPreset = (items: string[]) => items.length === selected.length && items.every((i) => selected.includes(i));

  const items = compact ? checkupItems.slice(0, 4) : checkupItems;
  const Heading = compact ? 'h3' : 'h2';

  return (
    <LayoutGroup>
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-2" role="group" aria-label="Готовые наборы">
            <span className="mr-1 text-[0.98rem] text-mute">Готовые наборы:</span>
            {checkupPresets.map((p) => (
              <button
                key={p.id}
                aria-pressed={isPreset(p.items)}
                onClick={() => setSelected(p.items)}
                className={cn('min-h-11 rounded-full border-2 px-5 font-medium transition-colors', isPreset(p.items) ? 'border-sage bg-sage text-white' : 'border-line bg-white hover:border-sage')}
              >
                {p.label}
              </button>
            ))}
            <span className="text-[0.9rem]"><T>{presetNote}</T></span>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((item) => {
              const on = selected.includes(item.id);
              return (
                <li key={item.id}>
                  <motion.button
                    whileTap={{ scale: 0.985 }}
                    role="checkbox"
                    aria-checked={on}
                    onClick={() => toggle(item.id)}
                    className={cn(
                      'flex h-full min-h-[120px] w-full flex-col rounded-[var(--radius-md)] border-2 p-5 text-left transition-[border-color,background-color,box-shadow] duration-200',
                      on ? 'border-sage bg-mint-soft' : 'border-transparent bg-white shadow-soft hover:border-sage/50',
                    )}
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="font-heading text-lg font-medium">{item.title}</span>
                      <span className={cn('grid h-7 w-7 shrink-0 place-items-center rounded-full border-2', on ? 'border-sage bg-sage text-white' : 'border-line text-transparent')}>
                        {on ? <Check size={16} strokeWidth={3} /> : <Plus size={16} />}
                      </span>
                    </span>
                    <span className="mt-1 text-[0.95rem] text-mute"><T>{item.lead}</T></span>
                    <span className="mt-auto pt-3">
                      {!on && item.price != null && (
                        <motion.span layoutId={`tag-${item.id}`} transition={SPRING} className="inline-block rounded-full bg-peach px-3 py-1 font-heading text-[0.95rem] font-medium">
                          {item.approx ? '≈ ' : ''}{formatPrice(item.price)}
                        </motion.span>
                      )}
                      {!on && item.price == null && <span className="text-[0.95rem]"><T>{item.todo ?? ''}</T></span>}
                      {on && <span className="text-[0.95rem] font-medium text-sage">Добавлено</span>}
                    </span>
                  </motion.button>
                </li>
              );
            })}
          </ul>
          {compact && (
            <p className="mt-5">
              <Link href="/checkup/" className="link-u font-heading text-lg font-medium text-sage">Все позиции, ЭКГ и анализы →</Link>
            </p>
          )}
        </div>

        <aside aria-label="Ваш чек-ап" className="rounded-[var(--radius-lg)] bg-white p-6 shadow-lift lg:sticky lg:top-28">
          <Heading className="text-2xl">Ваш чек-ап</Heading>

          <ul className="mt-4 min-h-[72px] space-y-2" aria-live="polite">
            <AnimatePresence initial={false}>
              {chosen.map((i) => (
                <motion.li key={i.id} layout exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="flex items-center justify-between gap-3 overflow-hidden">
                  <span>{i.title}</span>
                  {i.price != null ? (
                    <motion.span layoutId={`tag-${i.id}`} transition={SPRING} className="shrink-0 rounded-full bg-peach px-3 py-1 font-heading text-[0.95rem] font-medium">
                      {i.approx ? '≈ ' : ''}{formatPrice(i.price)}
                    </motion.span>
                  ) : (
                    <span className="text-[0.9rem]"><T>{i.todo ?? ''}</T></span>
                  )}
                </motion.li>
              ))}
            </AnimatePresence>
            {!chosen.length && <li className="text-mute">Выберите позиции слева или готовый набор.</li>}
          </ul>

          <label className="mt-5 flex min-h-12 cursor-pointer items-center justify-between gap-4 rounded-full bg-peach/50 px-5 py-2">
            <span className="font-medium">Приду в выходные</span>
            <span className="relative inline-flex">
              <input type="checkbox" role="switch" checked={weekend} onChange={(e) => setWeekend(e.target.checked)} className="peer sr-only" />
              <span className="h-8 w-14 rounded-full bg-[#c9bfae] transition-colors peer-checked:bg-sage peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sage" />
              <span className="absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow transition-transform duration-200 peer-checked:translate-x-6" />
            </span>
          </label>
          <p className="mt-2 text-[0.9rem] text-mute">По выходным −{site.weekendDiscount}% на анализы.</p>

          <dl className="mt-5 space-y-1.5 border-t border-line pt-4">
            <div className="flex justify-between"><dt className="text-mute">Позиции</dt><dd><AnimatedPrice value={calc.subtotal} /></dd></div>
            {weekend && (
              <div className="flex justify-between text-sage-dark">
                <dt>Выходная скидка на анализы</dt>
                <dd>{calc.discountPending ? <T>{ph.discountPending}</T> : `−${formatPrice(calc.discount)}`}</dd>
              </div>
            )}
            <div className="flex items-baseline justify-between pt-1">
              <dt className="font-heading text-lg">Итого{calc.approx ? ' ≈' : ''}</dt>
              <dd className="font-heading text-3xl text-sage"><AnimatedPrice value={calc.total} /></dd>
            </div>
          </dl>
          {calc.unknown.length > 0 && (
            <p className="mt-2 text-[0.9rem] text-mute">В сумму не вошли позиции с ценой по прайсу: {calc.unknown.map((u) => u.title).join(', ')}.</p>
          )}

          <Button
            size="lg"
            className="mt-5 w-full"
            disabled={!chosen.length}
            onClick={() => openBooking({ service: 'checkup', checkup: chosen.map((c) => c.title) })}
          >
            Записаться на чек-ап
          </Button>
          <p className="mt-3 text-[0.9rem] text-mute">{checkupDisclaimer}</p>
        </aside>
      </div>
    </LayoutGroup>
  );
}

