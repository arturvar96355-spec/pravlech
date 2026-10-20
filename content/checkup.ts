export type CheckupOption = { id: string; label: string; price: number };

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
  /** выбор зоны/вида: цена берётся из выбранного варианта */
  options?: CheckupOption[];
};

export const usZones: CheckupOption[] = [
  { id: 'thyroid', label: 'Щитовидная железа с лимфоузлами', price: 3000 },
  { id: 'abdomen', label: 'Органы брюшной полости, комплексно', price: 3800 },
  { id: 'pelvis', label: 'Малый таз (трансабдоминально)', price: 2700 },
  { id: 'breast', label: 'Молочные железы с лимфоузлами', price: 3000 },
  { id: 'kidneys', label: 'Почки, надпочечники', price: 2800 },
  { id: 'neck', label: 'Брахиоцефальные артерии (БЦА)', price: 4100 },
];

export const checkupItems: CheckupItem[] = [
  { id: 'c-therapist', title: 'Приём терапевта', lead: 'Первичный осмотр и план обследования', price: 3000 },
  { id: 'c-cardio', title: 'Приём кардиолога', lead: 'Давление, сердце', price: 3500 },
  { id: 'c-ecg', title: 'ЭКГ', lead: 'Запись работы сердца. Расшифровка — 900 ₽', price: 900 },
  { id: 'c-echo', title: 'ЭхоКГ', lead: 'УЗИ сердца', price: 4000 },
  { id: 'c-holter', title: 'Холтер', lead: 'Мониторирование до 24 часов', price: 5600 },
  { id: 'c-us', title: 'УЗИ', lead: 'Выберите зону', price: usZones[0].price, options: usZones },
  { id: 'c-labs', title: 'Анализ крови', lead: 'Цена от 2 850 ₽, состав подберёт врач', price: 2850, approx: true, weekendDiscount: true },
];

export type CheckupPreset = { id: string; label: string; items: string[] };

export const checkupPresets: CheckupPreset[] = [
  { id: 'heart', label: 'Сердце', items: ['c-cardio', 'c-ecg', 'c-echo'] },
  { id: 'after40', label: 'После 40', items: ['c-therapist', 'c-cardio', 'c-ecg', 'c-echo', 'c-labs'] },
  { id: 'family', label: 'Для семьи', items: ['c-therapist', 'c-us', 'c-labs'] },
];

/** Отзывы на Картах описывают «семейный чек-ап»: вся семья в одном месте. */
export const familyNote = {
  text: 'Для семьи: на каждого — терапевт, УЗИ и анализ крови. Запишите нескольких человек одной заявкой.',
  quote: 'Всё сразу и в одном месте!',
  author: 'Наталья К.',
};

export const presetNote = '[состав наборов — согласовать с клиникой]';
export const checkupDisclaimer = 'Предварительный расчёт. Окончательный план — после консультации терапевта.';
