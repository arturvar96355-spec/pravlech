import type { BookingTarget } from '@/lib/booking';
import { doctors } from './doctors';
import { services } from './services';

const doctorPhrase: Record<string, string> = {
  'vardanyan-a-g': 'к кардиологу Аргишти Гагиковичу Варданяну',
  'ermoshkina-n-yu': 'к неврологу Н. Ю. Ермошкиной',
  'salkaev-m-r': 'к оториноларингологу М. Р. Салькаеву',
  'vitushkina-yu': 'к оториноларингологу Ю. Витушкиной',
  goar: 'в процедурный кабинет к Гоар',
};

const servicePhrase: Record<string, string> = {
  therapist: 'к терапевту',
  cardio: 'к кардиологу',
  neuro: 'к неврологу',
  lor: 'к оториноларингологу (ЛОР)',
  us: 'на УЗИ',
  labs: 'в процедурный кабинет (анализы)',
};

export const checkupTarget: BookingTarget = {
  id: 'checkup',
  label: 'Чек-ап',
  phrase: 'на чек-ап',
  group: 'service',
  sub: 'Начнём с консультации терапевта',
};

export const bookingTargets: BookingTarget[] = [
  ...doctors
    .filter((d) => d.named)
    .map<BookingTarget>((d) => ({
      id: `d:${d.slug}`,
      label: d.name,
      phrase: doctorPhrase[d.slug],
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
