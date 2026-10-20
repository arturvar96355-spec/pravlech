'use client';

import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { Check, Plus } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { checkupDisclaimer, checkupItems, checkupPresets, presetNote, type CheckupItem } from '@/content/checkup';
import { site } from '@/content/site';
import { formatPrice } from '@/lib/typograph';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';
import { T } from '../ui/Text';
import { AnimatedPrice } from './AnimatedPrice';
import { useBooking } from './BookingProvider';

const SPRING = { type: 'spring', stiffness: 380, damping: 32 } as const;
const COMPACT_IDS = ['c-therapist', 'c-cardio', 'c-echo', 'c-us'];

export function CheckupBuilder({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [weekend, setWeekend] = useState(false);
  const [zones, setZones] = useState<Record<string, string>>({});
  const { openBooking } = useBooking();

  const option = (item: CheckupItem) => item.options?.find((o) => o.id === zones[item.id]) ?? item.options?.[0];
  const priceOf = (item: CheckupItem): number | null => (item.options ? option(item)!.price : item.price);

  const chosen = checkupItems.filter((i) => selected.includes(i.id));
  const calc = useMemo(() => {
    const subtotal = chosen.reduce((s, i) => s + (priceOf(i) ?? 0), 0);
    const discount = weekend
      ? Math.round(chosen.filter((i) => i.weekendDiscount).reduce((s, i) => s + (priceOf(i) ?? 0), 0) * (site.weekendDiscount / 100))
      : 0;
    return { subtotal, discount, total: subtotal - discount, approx: chosen.some((i) => i.approx) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosen, weekend, zones]);

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const isPreset = (items: string[]) => items.length === selected.length && items.every((i) => selected.includes(i));
  const items = compact ? checkupItems.filter((i) => COMPACT_IDS.includes(i.id)) : checkupItems;
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
                <li key={item.id} className="flex flex-col">
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
                      {!on && priceOf(item) != null && (
                        <motion.span layoutId={`tag-${item.id}`} transition={SPRING} className="inline-block rounded-full bg-peach px-3 py-1 font-heading text-[0.95rem] font-medium">
                          {item.approx ? 'от ' : ''}{formatPrice(priceOf(item) ?? 0)}
                        </motion.span>
                      )}
                      {on && <span className="text-[0.95rem] font-medium text-sage">Добавлено</span>}
                    </span>
                  </motion.button>
                  {item.options && on && (
                    <label className="mt-2 block">
                      <span className="sr-only">Зона УЗИ</span>
                      <select
                        value={option(item)!.id}
                        onChange={(e) => setZones((z) => ({ ...z, [item.id]: e.target.value }))}
                        className="h-12 w-full rounded-full border-2 border-line bg-white px-4 text-base outline-none focus:border-sage"
                      >
                        {item.options.map((o) => (
                          <option key={o.id} value={o.id}>{o.label} — {formatPrice(o.price)}</option>
                        ))}
                      </select>
                    </label>
                  )}
                </li>
              );
            })}
          </ul>
          {compact && (
            <p className="mt-5">
              <Link href="/checkup/" className="link-u font-heading text-lg font-medium text-sage">Все позиции: ЭКГ, холтер, анализы →</Link>
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
                  <motion.span layoutId={`tag-${i.id}`} transition={SPRING} className="shrink-0 rounded-full bg-peach px-3 py-1 font-heading text-[0.95rem] font-medium">
                    {i.approx ? 'от ' : ''}{formatPrice(priceOf(i) ?? 0)}
                  </motion.span>
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
                <dd>{calc.discount ? `−${formatPrice(calc.discount)}` : '—'}</dd>
              </div>
            )}
            <div className="flex items-baseline justify-between pt-1">
              <dt className="font-heading text-lg">Итого{calc.approx ? ' от' : ''}</dt>
              <dd className="font-heading text-3xl text-sage"><AnimatedPrice value={calc.total} /></dd>
            </div>
          </dl>

          <Button
            size="lg"
            className="mt-5 w-full"
            disabled={!chosen.length}
            onClick={() =>
              openBooking({
                service: 'checkup',
                checkup: chosen.map((c) => (c.options ? `${c.title}: ${option(c)!.label}` : c.title)),
              })
            }
          >
            Записаться на чек-ап
          </Button>
          <p className="mt-3 text-[0.9rem] text-mute">{checkupDisclaimer}</p>
        </aside>
      </div>
    </LayoutGroup>
  );
}
