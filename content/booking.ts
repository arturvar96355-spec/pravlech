import type { BookingTarget } from '@/lib/booking';
import { doctors } from './doctors';
import { services } from './services';

const servicePhrase: Record<string, string> = {
  therapist: 'к терапевту',
  cardio: 'к кардиологу',
  neuro: 'к неврологу',
  lor: 'к оториноларингологу (ЛОР)',
  gyn: 'к акушеру-гинекологу',
  endo: 'к эндокринологу',
  gastro: 'к гастроэнтерологу',
  uro: 'к урологу',
  mammo: 'к маммологу',
  derm: 'к дерматологу',
  us: 'на УЗИ',
  labs: 'в процедурный кабинет (анализы)',
  massage: 'на массаж',
  spravki: 'за медицинской справкой',
};

export const checkupTarget: BookingTarget = {
  id: 'checkup',
  label: 'Чек-ап',
  phrase: 'на чек-ап',
  group: 'service',
  sub: 'Начнём с консультации терапевта',
};

export const bookingTargets: BookingTarget[] = [
  ...doctors.map<BookingTarget>((d) => ({
    id: `d:${d.slug}`,
    label: d.name,
    phrase: d.bookingPhrase,
    group: 'doctor',
    sub: d.specialty,
  })),
  ...services.map<BookingTarget>((s) => ({
    id: `s:${s.id}`,
    label: s.title,
    phrase: servicePhrase[s.id],
    group: 'service',
    sub: s.lead,
    priceText: s.priceText,
  })),
  checkupTarget,
];

export function targetForDoctor(slug: string): BookingTarget | undefined {
  return bookingTargets.find((t) => t.id === `d:${slug}`);
}
export function targetForService(id: string): BookingTarget | undefined {
  return id === 'checkup' ? checkupTarget : bookingTargets.find((t) => t.id === `s:${id}`);
}
