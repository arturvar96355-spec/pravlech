export type CheckupItem = {
  id: string;
  title: string;
  lead: string;
  price: number | null;
  /** Цена приблизительная («≈») */
  approx?: boolean;
  todo?: string;
  /** на позицию действует выходная скидка */
  weekendDiscount?: boolean;
  zones?: boolean;
};

export const checkupItems: CheckupItem[] = [
  { id: 'c-therapist', title: 'Приём терапевта', lead: 'Первичный осмотр и план обследования', price: 3500 },
  { id: 'c-cardio', title: 'Приём кардиолога', lead: 'Давление, сердце', price: 4500 },
  { id: 'c-echo', title: 'ЭхоКГ', lead: 'УЗИ сердца', price: 4000 },
  { id: 'c-us', title: 'УЗИ', lead: 'Выберите зону — цена 2 000–3 000 ₽', price: 2500, approx: true, zones: true },
  { id: 'c-ecg', title: 'ЭКГ', lead: 'Запись работы сердца', price: null, todo: '[цена — уточнить]' },
  { id: 'c-labs', title: 'Анализы', lead: 'Состав подберёт врач', price: null, todo: '[позиции и цены — от клиента]', weekendDiscount: true },
];

export const usZones = ['[зона — уточнить]', '[зона — уточнить]', '[зона — уточнить]'] as const;
export const usRange: [number, number] = [2000, 3000];

export type CheckupPreset = { id: string; label: string; items: string[] };

export const checkupPresets: CheckupPreset[] = [
  { id: 'heart', label: 'Сердце', items: ['c-cardio', 'c-echo', 'c-ecg'] },
  { id: 'after40', label: 'После 40', items: ['c-therapist', 'c-cardio', 'c-echo', 'c-labs'] },
];

export const presetNote = '[состав — согласовать с клиникой]';
export const checkupDisclaimer = 'Предварительный расчёт. Окончательный план — после консультации терапевта.';
