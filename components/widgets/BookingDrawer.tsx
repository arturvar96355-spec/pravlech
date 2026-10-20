'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, ChevronLeft, Copy, MessageCircle, Phone, Plus, Search, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useForm, type Resolver } from 'react-hook-form';
import { z } from 'zod';
import { bookingTargets } from '@/content/booking';
import { site } from '@/content/site';
import {
  buildBookingMessage,
  forWhomOptions,
  maskPhone,
  phoneDigits,
  messengerHref,
  type BookingTarget,
  type ForWhomId,
} from '@/lib/booking';
import { normalize } from '@/lib/normalize';
import { buildBookingDays } from '@/lib/schedule';
import { cn } from '@/lib/utils';
import { Button, ButtonLink } from '../ui/Button';
import { T } from '../ui/Text';

const STEPS = ['Врач', 'Время', 'Контакты'] as const;
const EASE = [0.22, 1, 0.36, 1] as const;

const schema = z.object({
  name: z.string().trim().min(2, 'Укажите имя'),
  phone: z.string().refine((v) => phoneDigits(v) === 11, 'Введите телефон полностью'),
  forWhom: z.enum(['self', 'child', 'parent', 'other']),
  comment: z.string().max(500).optional(),
  consent: z.literal(true, { error: 'Нужно Ваше согласие' }),
});
type FormValues = { name: string; phone: string; forWhom: ForWhomId; comment?: string; consent: boolean };

const resolver: Resolver<FormValues> = async (values) => {
  const r = schema.safeParse(values);
  if (r.success) return { values: r.data as FormValues, errors: {} };
  const errors: Record<string, { type: string; message: string }> = {};
  for (const issue of r.error.issues) {
    const key = String(issue.path[0]);
    if (!errors[key]) errors[key] = { type: 'validation', message: issue.message };
  }
  return { values: {}, errors };
};

const slide = {
  enter: (dir: number) => ({ x: dir > 0 ? 56 : -56, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -56 : 56, opacity: 0 }),
};

export function BookingDrawer({
  open,
  onClose,
  initialTarget,
  checkup,
}: {
  open: boolean;
  onClose: () => void;
  initialTarget: BookingTarget | null;
  checkup?: string[];
}) {
  const reduce = useReducedMotion();
  const [[step, dir], setStep] = useState<[number, number]>([initialTarget ? 1 : 0, 0]);
  const [target, setTarget] = useState<BookingTarget | null>(initialTarget);
  const [query, setQuery] = useState('');
  const days = useMemo(() => buildBookingDays(14), []);
  const [dayIso, setDayIso] = useState<string | null>(() => days.find((d) => d.slots.length)?.iso ?? null);
  const [time, setTime] = useState<string | null>(null);
  const [done, setDone] = useState<{ text: string; link: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [others, setOthers] = useState<Array<{ forWhom: ForWhomId; name: string }>>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const day = days.find((d) => d.iso === dayIso);

  const form = useForm<FormValues>({
    resolver,
    defaultValues: { name: '', phone: '', forWhom: 'self', comment: '', consent: false },
  });
  const { register, handleSubmit, setValue, watch, formState } = form;
  const forWhom = watch('forWhom');

  // Блокировка прокрутки и возврат фокуса
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    window.__lenis?.stop();
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    return () => {
      window.__lenis?.start();
      document.body.style.overflow = '';
      prev?.focus?.();
    };
  }, []);

  // Esc и ловушка фокуса
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), textarea, [tabindex="0"]');
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const go = (to: number) => setStep(([cur]) => [to, to > cur ? 1 : -1]);

  const filtered = useMemo(() => {
    const q = normalize(query);
    return bookingTargets.filter((t) => !q || normalize(`${t.label} ${t.sub ?? ''}`).includes(q));
  }, [query]);

  const onSubmit = handleSubmit((v) => {
    const text = buildBookingMessage({
      target,
      dayLabel: day?.longLabel ?? '',
      time: time ?? '',
      name: v.name.trim(),
      phone: v.phone,
      forWhom: v.forWhom,
      comment: v.comment,
      checkup,
      others,
    });
    const link = messengerHref(text);
    setDone({ text, link });
    // Текст кладём в буфер: в Telegram по ссылке он подставляется не везде
    navigator.clipboard?.writeText(text).catch(() => {});
    window.open(link, '_blank', 'noopener,noreferrer');
  });

  const copy = async () => {
    if (!done) return;
    try {
      await navigator.clipboard.writeText(done.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* буфер недоступен — текст виден на экране */
    }
  };

  const groups = [
    { id: 'doctor', title: 'Врачи', items: filtered.filter((t) => t.group === 'doctor') },
    { id: 'service', title: 'Направления', items: filtered.filter((t) => t.group === 'service') },
  ];

  const progress = done ? 100 : ((step + 1) / STEPS.length) * 100;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button aria-label="Закрыть окно записи" tabIndex={-1} onClick={onClose} className="absolute inset-0 cursor-default bg-ink/45" />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            className="relative flex h-full w-full max-w-[560px] flex-col overflow-hidden bg-cream shadow-lift sm:rounded-l-[32px]"
            initial={reduce ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <header className="border-b border-line px-5 pb-4 pt-5 sm:px-8">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {step > 0 && !done && (
                    <button onClick={() => go(step - 1)} aria-label="Назад" className="-ml-2 grid h-11 w-11 place-items-center rounded-full text-sage hover:bg-mint">
                      <ChevronLeft />
                    </button>
                  )}
                  <h2 id="booking-title" className="text-xl sm:text-2xl">
                    {done ? 'Заявка готова' : 'Запись к врачу'}
                  </h2>
                </div>
                <button onClick={onClose} aria-label="Закрыть" className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-mint">
                  <X />
                </button>
              </div>
              <ol className="mt-4 flex gap-2" aria-label="Шаги записи">
                {STEPS.map((s, i) => (
                  <li key={s} aria-current={i === step && !done ? 'step' : undefined} className={cn('flex-1 text-sm font-medium', i <= step || done ? 'text-sage' : 'text-mute')}>
                    <span className="mb-1 block">{i + 1}. {s}</span>
                  </li>
                ))}
              </ol>
              <div className="h-1.5 overflow-hidden rounded-full bg-mint" aria-hidden>
                <motion.div className="h-full origin-left rounded-full bg-sage" initial={false} animate={{ scaleX: progress / 100 }} style={{ width: '100%' }} transition={{ duration: 0.5, ease: EASE }} />
              </div>
            </header>

            <div className="relative flex-1 overflow-y-auto overflow-x-hidden overscroll-contain" data-lenis-prevent>
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                {done ? (
                  <motion.div key="done" custom={1} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, ease: EASE }} className="px-5 py-8 sm:px-8">
                    <motion.div
                      initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                      className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-sage text-white"
                    >
                      <Check size={34} strokeWidth={2.5} />
                    </motion.div>
                    <h3 className="text-2xl">Осталось отправить заявку</h3>
                    <p className="mt-2 text-mute">Администратор подтвердит время. Время в заявке — ориентировочное.</p>
                    <pre className="mt-5 whitespace-pre-wrap rounded-[20px] bg-white p-4 font-body text-base leading-relaxed shadow-soft">{done.text}</pre>
                    <div className="mt-5 flex flex-col gap-3">
                      <ButtonLink href={done.link} size="lg"><MessageCircle size={20} /> Отправить в {site.messenger.name}</ButtonLink>
                      <p className="text-[0.92rem] text-mute">Если текст не подставился сам, он уже скопирован — вставьте его в чат.</p>
                      <Button variant="secondary" onClick={copy}>
                        <Copy size={18} /> {copied ? 'Скопировано' : 'Скопировать текст'}
                      </Button>
                      <ButtonLink variant="secondary" size="lg" href={site.phones[0].href}>
                        <Phone size={20} /> Или позвоните: {site.phones[0].display}
                      </ButtonLink>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key={step} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.38, ease: EASE }} className="px-5 py-6 sm:px-8">
                    {step === 0 && (
                      <section aria-labelledby="s1">
                        <h3 id="s1" className="text-xl">К кому хотите записаться?</h3>
                        <label className="relative mt-4 block">
                          <span className="sr-only">Поиск врача или направления</span>
                          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute" size={20} />
                          <input
                            data-autofocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Врач или направление"
                            className="h-14 w-full rounded-full border-2 border-line bg-white pl-12 pr-4 text-base outline-none focus:border-sage"
                          />
                        </label>
                        <div className="mt-5 space-y-6">
                          {groups.map((g) =>
                            g.items.length ? (
                              <div key={g.id}>
                                <h4 className="mb-2 text-sm font-medium uppercase tracking-wider text-mute">{g.title}</h4>
                                <ul className="space-y-2">
                                  {g.items.map((t) => (
                                    <li key={t.id}>
                                      <button
                                        onClick={() => {
                                          setTarget(t);
                                          go(1);
                                        }}
                                        aria-pressed={target?.id === t.id}
                                        className={cn(
                                          'flex min-h-16 w-full items-center justify-between gap-3 rounded-[20px] border-2 bg-white px-4 py-3 text-left transition-colors hover:border-sage',
                                          target?.id === t.id ? 'border-sage' : 'border-transparent',
                                        )}
                                      >
                                        <span>
                                          <span className="block font-heading font-medium">{t.label}</span>
                                          {t.sub && <span className="block text-[0.95rem] text-mute"><T>{t.sub}</T></span>}
                                        </span>
                                        {t.priceText && <span className="shrink-0 text-[0.95rem] font-medium text-sage"><T>{t.priceText}</T></span>}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : null,
                          )}
                          {groups.every((g) => !g.items.length) && <p className="text-mute">Ничего не нашли. Позвоните — администратор подскажет.</p>}
                        </div>
                      </section>
                    )}

                    {step === 1 && (
                      <section aria-labelledby="s2">
                        <h3 id="s2" className="text-xl">Когда Вам удобно?</h3>
                        {target && <p className="mt-1 text-mute">{target.label}</p>}
                        <div role="radiogroup" aria-label="День" className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8" data-lenis-prevent>
                          {days.map((d) => (
                            <button
                              key={d.iso}
                              role="radio"
                              aria-checked={dayIso === d.iso}
                              disabled={!d.slots.length}
                              onClick={() => {
                                setDayIso(d.iso);
                                setTime(null);
                              }}
                              className={cn(
                                'flex min-h-[72px] min-w-[64px] shrink-0 flex-col items-center justify-center rounded-[20px] border-2 px-2 py-2 transition-colors disabled:opacity-40',
                                dayIso === d.iso ? 'border-sage bg-sage text-white' : 'border-transparent bg-white hover:border-sage',
                              )}
                            >
                              <span className="text-sm">{d.isToday ? 'Сегодня' : d.weekdayShort}</span>
                              <span className="font-heading text-xl font-semibold">{d.dayNum}</span>
                            </button>
                          ))}
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Время">
                          {day?.slots.map((s) => (
                            <button
                              key={s}
                              role="radio"
                              aria-checked={time === s}
                              onClick={() => setTime(s)}
                              className={cn(
                                'min-h-12 rounded-full border-2 font-medium transition-colors',
                                time === s ? 'border-sage bg-sage text-white' : 'border-line bg-white hover:border-sage',
                              )}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                        <p className="mt-4 rounded-[16px] bg-peach/50 p-3 text-[0.95rem]">
                          Ориентировочно — администратор подтвердит время. <T>{site.misNote}</T>
                          <span className="mt-1 block">Стоимость уточняйте при записи. Дополнительные процедуры — только по согласованию с Вами.</span>
                        </p>
                        <Button size="lg" className="mt-5 w-full" disabled={!time || !day} onClick={() => go(2)}>
                          Дальше
                        </Button>
                      </section>
                    )}

                    {step === 2 && (
                      <form onSubmit={onSubmit} noValidate aria-labelledby="s3">
                        <h3 id="s3" className="text-xl">Как с Вами связаться?</h3>
                        <p className="mt-1 rounded-[16px] bg-mint p-3 text-[0.95rem]">
                          {target?.label} · {day?.longLabel} · {time}
                        </p>
                        {checkup?.length ? <p className="mt-2 text-[0.95rem] text-mute">В чек-ап входит: {checkup.join(', ')}</p> : null}

                        <div className="mt-4 space-y-4">
                          <Field label="Имя" error={formState.errors.name?.message}>
                            <input data-autofocus autoComplete="given-name" {...register('name')} className={inputCls} aria-invalid={!!formState.errors.name} />
                          </Field>
                          <Field label="Телефон" error={formState.errors.phone?.message}>
                            <input
                              inputMode="tel"
                              autoComplete="tel"
                              placeholder="+7 (___) ___-__-__"
                              {...register('phone', { onChange: (e) => setValue('phone', maskPhone(e.target.value)) })}
                              className={inputCls}
                              aria-invalid={!!formState.errors.phone}
                            />
                          </Field>
                          <fieldset>
                            <legend className="mb-2 font-medium">Для кого запись</legend>
                            <div className="flex flex-wrap gap-2">
                              {forWhomOptions.map((o) => (
                                <label key={o.id} className={cn('cursor-pointer rounded-full border-2 px-5 py-2.5 transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-sage', forWhom === o.id ? 'border-sage bg-sage text-white' : 'border-line bg-white hover:border-sage')}>
                                  <input type="radio" value={o.id} {...register('forWhom')} className="sr-only" />
                                  {o.label}
                                </label>
                              ))}
                            </div>
                          </fieldset>
                          <div>
                            {others.map((o, i) => (
                              <div key={i} className="mb-3 rounded-[20px] bg-mint-soft p-4">
                                <div className="flex items-center justify-between gap-2">
                                  <p className="font-medium">Ещё один человек</p>
                                  <button type="button" onClick={() => setOthers((l) => l.filter((_, k) => k !== i))} className="min-h-11 rounded-full px-3 text-[0.95rem] text-sage hover:bg-mint">Убрать</button>
                                </div>
                                <input
                                  aria-label="Имя"
                                  placeholder="Имя"
                                  value={o.name}
                                  onChange={(e) => setOthers((l) => l.map((x, k) => (k === i ? { ...x, name: e.target.value } : x)))}
                                  className={cn(inputCls, 'mt-2')}
                                />
                                <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Для кого">
                                  {forWhomOptions.filter((f) => f.id !== 'self').map((f) => (
                                    <button
                                      type="button"
                                      key={f.id}
                                      aria-pressed={o.forWhom === f.id}
                                      onClick={() => setOthers((l) => l.map((x, k) => (k === i ? { ...x, forWhom: f.id } : x)))}
                                      className={cn('min-h-11 rounded-full border-2 px-4 transition-colors', o.forWhom === f.id ? 'border-sage bg-sage text-white' : 'border-line bg-white hover:border-sage')}
                                    >
                                      {f.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                            {others.length < 3 && (
                              <button type="button" onClick={() => setOthers((l) => [...l, { forWhom: 'child', name: '' }])} className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-dashed border-sage/50 px-5 font-medium text-sage hover:border-sage hover:bg-mint-soft">
                                <Plus size={18} aria-hidden /> Записать ещё одного человека
                              </button>
                            )}
                          </div>
                          <Field label="Комментарий (необязательно)">
                            <textarea rows={3} {...register('comment')} className={cn(inputCls, 'h-auto rounded-[20px] py-3')} />
                          </Field>
                          <div>
                            <label className="flex cursor-pointer items-start gap-3 text-[0.95rem]">
                              <input type="checkbox" {...register('consent')} className="mt-1 h-6 w-6 shrink-0 accent-[#2f6f5e]" aria-invalid={!!formState.errors.consent} />
                              <span>
                                Согласен(на) на обработку персональных данных.{' '}
                                <Link href="/privacy/" target="_blank" className="link-u text-sage">Политика</Link>
                              </span>
                            </label>
                            {formState.errors.consent && <p role="alert" className="mt-1 text-[0.95rem] text-[#a3361d]">{formState.errors.consent.message}</p>}
                          </div>
                        </div>
                        <Button type="submit" size="lg" className="mt-6 w-full">Записаться</Button>
                        <p className="mt-3 text-center text-sm text-mute">Нажимая кнопку, Вы соглашаетесь на обработку персональных данных.</p>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputCls = 'h-14 w-full rounded-full border-2 border-line bg-white px-5 text-base outline-none transition-colors focus:border-sage aria-[invalid=true]:border-[#a3361d]';

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-medium">{label}</span>
      {children}
      {error && <span role="alert" className="mt-1 block text-[0.95rem] text-[#a3361d]">{error}</span>}
    </label>
  );
}
