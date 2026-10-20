import { PRICE_TODO } from './services';

export type PriceItem = {
  id: string;
  title: string;
  /** точная цена */
  price?: number;
  /** диапазон */
  range?: [number, number];
  note?: string;
  /** на позицию действует выходная скидка */
  weekendDiscount?: boolean;
  todo?: string;
};

export type PriceGroup = { id: string; title: string; items: PriceItem[] };

export const priceGroups: PriceGroup[] = [
  {
    id: 'reception',
    title: 'Приёмы',
    items: [
      { id: 'p-therapist', title: 'Приём терапевта', price: 3500 },
      { id: 'p-cardio', title: 'Приём кардиолога', price: 4500 },
      { id: 'p-neuro', title: 'Приём невролога', todo: PRICE_TODO },
      { id: 'p-lor', title: 'Приём оториноларинголога (ЛОР)', todo: PRICE_TODO },
    ],
  },
  {
    id: 'diagnostics',
    title: 'Диагностика',
    items: [
      { id: 'p-echo', title: 'ЭхоКГ (УЗИ сердца)', price: 4000 },
      { id: 'p-us', title: 'УЗИ', range: [2000, 3000], note: 'цена зависит от зоны' },
      { id: 'p-ecg', title: 'ЭКГ', todo: '[цена — уточнить]' },
    ],
  },
  {
    id: 'labs',
    title: 'Анализы',
    items: [
      { id: 'p-blood', title: 'Забор крови', todo: PRICE_TODO, weekendDiscount: true },
      { id: 'p-labs', title: 'Лабораторные анализы', todo: '[позиции и цены — от клиента]', weekendDiscount: true, note: 'по выходным −10%' },
    ],
  },
  {
    id: 'other',
    title: 'Справки и профосмотры',
    items: [{ id: 'p-cert', title: 'Справка / профосмотр', todo: '[уточнить, оказывается ли услуга, и цена]' }],
  },
];

/** Топ-позиции для блока на главной */
export const topPriceIds = ['p-therapist', 'p-cardio', 'p-echo', 'p-us'] as const;

export const allPriceItems: Array<PriceItem & { group: string }> = priceGroups.flatMap((g) =>
  g.items.map((i) => ({ ...i, group: g.title })),
);
