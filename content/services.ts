import type { SpecialtyId } from './doctors';

export type Service = {
  id: string;
  title: string;
  /** Короткая подпись в списке записи */
  lead: string;
  icon: 'heart' | 'brain' | 'ear' | 'probe' | 'tube' | 'stetho';
  /** Для записи: цена приёма. null — прайс от клиента */
  price: number | null;
  priceText: string;
  specialtyId?: SpecialtyId;
};

export const PRICE_TODO = '[прайс — от клиента]';

export const services: Service[] = [
  { id: 'therapist', title: 'Терапевт', lead: 'Первый приём, справки, «не знаю, к кому идти»', icon: 'stetho', price: 3500, priceText: '3 500 ₽' },
  { id: 'cardio', title: 'Кардиолог', lead: 'Давление, сердце, ЭхоКГ', icon: 'heart', price: 4500, priceText: '4 500 ₽', specialtyId: 'cardio' },
  { id: 'neuro', title: 'Невролог', lead: 'Головная боль, спина, онемение', icon: 'brain', price: null, priceText: PRICE_TODO, specialtyId: 'neuro' },
  { id: 'lor', title: 'Оториноларинголог (ЛОР)', lead: 'Ухо, горло, нос', icon: 'ear', price: null, priceText: PRICE_TODO, specialtyId: 'lor' },
  { id: 'us', title: 'УЗИ', lead: 'Цена зависит от зоны', icon: 'probe', price: null, priceText: '2 000–3 000 ₽' },
  { id: 'labs', title: 'Анализы, процедурный кабинет', lead: 'Забор крови', icon: 'tube', price: null, priceText: PRICE_TODO },
];

export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}
