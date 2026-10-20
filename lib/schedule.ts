import { hours, site } from '@/content/site';

export type MoscowNow = { y: number; m: number; d: number; day: number; minutes: number };

const MONTHS_GEN = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

export function moscowNow(date: Date = new Date()): MoscowNow {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: site.tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  const y = get('year');
  const m = get('month');
  const d = get('day');
  const hour = get('hour') % 24;
  const day = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return { y, m, d, day, minutes: hour * 60 + get('minute') };
}

function hoursOf(day: number) {
  return hours.find((h) => h.day === day)!;
}

const pad = (n: number) => String(n).padStart(2, '0');

export function formatTime(minutes: number): string {
  return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
}

export type OpenStatus = { open: boolean; text: string };

export function openStatus(now: MoscowNow = moscowNow()): OpenStatus {
  const today = hoursOf(now.day);
  if (now.minutes >= today.open * 60 && now.minutes < today.close * 60) {
    return { open: true, text: `Открыто до ${today.close}:00` };
  }
  if (now.minutes < today.open * 60) {
    return { open: false, text: `Закрыто, откроемся сегодня в ${today.open}:00` };
  }
  const tomorrow = hoursOf((now.day + 1) % 7);
  return { open: false, text: `Закрыто, откроемся завтра в ${tomorrow.open}:00` };
}

export type BookingDay = {
  iso: string;
  weekdayShort: string;
  dayNum: number;
  label: string;
  longLabel: string;
  slots: string[];
  isToday: boolean;
};

/** Ближайшие 14 дней, слоты каждые 30 минут в рамках режима. Для сегодняшнего дня — не раньше, чем через час. */
export function buildBookingDays(count = 14, now: MoscowNow = moscowNow()): BookingDay[] {
  const days: BookingDay[] = [];
  for (let i = 0; i < count; i++) {
    const dt = new Date(Date.UTC(now.y, now.m - 1, now.d + i));
    const dow = dt.getUTCDay();
    const h = hoursOf(dow);
    const slots: string[] = [];
    for (let t = h.open * 60; t <= h.close * 60 - 30; t += 30) {
      if (i === 0 && t < now.minutes + 60) continue;
      slots.push(formatTime(t));
    }
    const dayNum = dt.getUTCDate();
    const month = MONTHS_GEN[dt.getUTCMonth()];
    days.push({
      iso: `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dayNum)}`,
      weekdayShort: h.short,
      dayNum,
      label: `${h.short}, ${dayNum} ${month}`,
      longLabel: `${dayNum} ${month} (${h.long.toLowerCase()})`,
      slots,
      isToday: i === 0,
    });
  }
  return days;
}
