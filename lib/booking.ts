import { site } from '@/content/site';

export const forWhomOptions = [
  { id: 'self', label: 'Себе' },
  { id: 'child', label: 'Ребёнку' },
  { id: 'parent', label: 'Родителю' },
  { id: 'other', label: 'Другое' },
] as const;

export type ForWhomId = (typeof forWhomOptions)[number]['id'];

export type BookingTarget = {
  id: string;
  label: string;
  /** «к кардиологу …», «на УЗИ» — для текста заявки */
  phrase: string;
  group: 'doctor' | 'service';
  sub?: string;
  priceText?: string;
};

export type BookingRequest = {
  target: BookingTarget | null;
  dayLabel: string;
  time: string;
  name: string;
  phone: string;
  forWhom: ForWhomId;
  comment?: string;
  /** Состав чек-апа, если запись идёт из конструктора */
  checkup?: string[];
};

/** Текст заявки для мессенджера. */
export function buildBookingMessage(r: BookingRequest): string {
  const who = r.target?.phrase ?? 'к врачу';
  const lines = [`Здравствуйте! Хочу записаться ${who} на ${r.dayLabel} в ${r.time}.`];
  const whom = forWhomOptions.find((o) => o.id === r.forWhom)?.label ?? '';
  lines.push(`Запись: ${whom.toLowerCase()}.`);
  if (r.checkup?.length) lines.push(`Чек-ап: ${r.checkup.join(', ')}.`);
  lines.push(`Имя: ${r.name}.`, `Телефон: ${r.phone}.`);
  if (r.comment?.trim()) lines.push(`Комментарий: ${r.comment.trim()}`);
  lines.push('Время ориентировочное, прошу подтвердить.');
  return lines.join('\n');
}

export function whatsappHref(text: string): string | null {
  const num = site.whatsapp.replace(/\D/g, '');
  if (!num) return null;
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
}

/** Маска +7 (XXX) XXX-XX-XX по вводимым цифрам. */
export function maskPhone(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('8') || digits.startsWith('7')) digits = digits.slice(1);
  digits = digits.slice(0, 10);
  let out = '+7';
  if (digits.length > 0) out += ' (' + digits.slice(0, 3);
  if (digits.length >= 3) out += ')';
  if (digits.length > 3) out += ' ' + digits.slice(3, 6);
  if (digits.length > 6) out += '-' + digits.slice(6, 8);
  if (digits.length > 8) out += '-' + digits.slice(8, 10);
  return out;
}

export function phoneDigits(masked: string): number {
  return masked.replace(/\D/g, '').length;
}
