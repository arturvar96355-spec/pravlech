import type { SpecialtyId } from './doctors';

export type ServiceIconName = 'heart' | 'brain' | 'ear' | 'probe' | 'tube' | 'stetho' | 'flower' | 'sparkles' | 'activity' | 'salad' | 'drops' | 'shield' | 'hand' | 'file';

export type Service = {
  id: string;
  title: string;
  lead: string;
  icon: ServiceIconName;
  /** Цена первичного приёма или входной позиции. null — прайс от клиента */
  price: number | null;
  /** «Первичный приём», «Забор крови», «Цена» */
  priceCaption: string;
  priceText: string;
  specialtyId?: SpecialtyId;
};

export const PRICE_TODO = '[прайс — от клиента]';

const visit = 'Первичный приём';

export const services: Service[] = [
  { id: 'therapist', title: 'Терапевт', lead: 'Первый приём, справки, «не знаю, к кому идти»', icon: 'stetho', price: 3000, priceCaption: visit, priceText: '3 000 ₽' },
  { id: 'cardio', title: 'Кардиолог', lead: 'Давление, сердце, ЭКГ, холтер', icon: 'heart', price: 3500, priceCaption: visit, priceText: '3 500 ₽', specialtyId: 'cardio' },
  { id: 'neuro', title: 'Невролог', lead: 'Головная боль, спина, онемение', icon: 'brain', price: 3500, priceCaption: visit, priceText: '3 500 ₽', specialtyId: 'neuro' },
  { id: 'lor', title: 'Оториноларинголог (ЛОР)', lead: 'Ухо, горло, нос. Взрослые и дети', icon: 'ear', price: 3000, priceCaption: visit, priceText: '3 000 ₽', specialtyId: 'lor' },
  { id: 'gyn', title: 'Акушерство и гинекология', lead: 'Осмотр, планирование беременности, репродуктология', icon: 'flower', price: 3000, priceCaption: visit, priceText: '3 000 ₽', specialtyId: 'gyn' },
  { id: 'endo', title: 'Эндокринолог', lead: 'Щитовидная железа, обмен веществ', icon: 'activity', price: 3000, priceCaption: visit, priceText: '3 000 ₽', specialtyId: 'endo' },
  { id: 'gastro', title: 'Гастроэнтеролог', lead: 'Желудок, кишечник, поджелудочная', icon: 'salad', price: 3000, priceCaption: visit, priceText: '3 000 ₽' },
  { id: 'uro', title: 'Уролог', lead: 'Мочеполовая система', icon: 'drops', price: 3000, priceCaption: visit, priceText: '3 000 ₽' },
  { id: 'mammo', title: 'Маммолог', lead: 'Осмотр и консультация', icon: 'shield', price: 3000, priceCaption: visit, priceText: '3 000 ₽' },
  { id: 'derm', title: 'Дерматолог, косметология', lead: 'Родинки, чистка лица, пилинги', icon: 'sparkles', price: 3000, priceCaption: 'Консультация', priceText: '3 000 ₽', specialtyId: 'derm' },
  { id: 'us', title: 'УЗИ', lead: 'Цена зависит от зоны', icon: 'probe', price: null, priceCaption: 'Цена', priceText: 'от 1 900 ₽', specialtyId: 'us' },
  { id: 'labs', title: 'Анализы, процедурный кабинет', lead: 'Забор крови, инъекции, капельницы', icon: 'tube', price: 350, priceCaption: 'Забор крови', priceText: '350 ₽', specialtyId: 'procedure' },
  { id: 'massage', title: 'Массаж', lead: 'Для взрослых и детей', icon: 'hand', price: null, priceCaption: 'Цена', priceText: 'от 1 400 ₽' },
  { id: 'spravki', title: 'Медицинские справки', lead: 'Общая справка, в бассейн, 095/у', icon: 'file', price: null, priceCaption: 'Цена', priceText: 'от 1 300 ₽' },
];

export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}
