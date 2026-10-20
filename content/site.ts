import { tp } from '@/lib/typograph';

export type DayHours = { day: number; short: string; long: string; open: number; close: number };

/** day: 0 — воскресенье (как в Date.getDay) */
export const hours: DayHours[] = [
  { day: 1, short: 'Пн', long: 'Понедельник', open: 8, close: 21 },
  { day: 2, short: 'Вт', long: 'Вторник', open: 8, close: 21 },
  { day: 3, short: 'Ср', long: 'Среда', open: 8, close: 21 },
  { day: 4, short: 'Чт', long: 'Четверг', open: 8, close: 21 },
  { day: 5, short: 'Пт', long: 'Пятница', open: 8, close: 21 },
  { day: 6, short: 'Сб', long: 'Суббота', open: 8, close: 20 },
  { day: 0, short: 'Вс', long: 'Воскресенье', open: 8, close: 18 },
];

export const site = {
  name: 'Правильное лечение',
  fullName: 'Медицинский центр «Правильное лечение»',
  tagline: 'Врачи, которые объясняют',
  tz: 'Europe/Moscow',
  phones: [
    { display: '+7 (495) 287-64-48', href: 'tel:+74952876448' },
    { display: '+7 (495) 150-69-99', href: 'tel:+74951506999' },
  ],
  address: {
    street: 'Москва, Перовская ул., 66к3',
    district: 'Перово, ВАО',
    mapsUrl: 'https://yandex.ru/maps/?text=' + encodeURIComponent('Москва, Перовская ул., 66к3'),
    mapsLinkNote: '[ссылка на карточку организации — уточнить]',
  },
  rating: {
    value: 5.0,
    marks: 437,
    reviews: 278,
    source: 'Яндекс Карты',
  },
  /** Номер WhatsApp в формате 79991234567. Пока пусто — сайт показывает «Позвонить». */
  whatsapp: '' as string,
  whatsappPlaceholder: '[номер WhatsApp — от клиента]',
  license: '[номер и дата — от клиента]',
  legalEntity: '[юридическое лицо: наименование, ИНН, ОГРН — от клиента]',
  logoNote: '[логотип — от клиента]',
  founded: '[год основания — уточнить]',
  warning: 'Имеются противопоказания. Необходима консультация специалиста',
  weekendDiscount: 10,
  conceptNote: tp(
    'Концепт сайта, подготовлен для «Правильное лечение» студией Kovagor. Не является официальным сайтом компании',
  ),
  misNote: '[интеграция с МИС — после запуска]',
  hours,
} as const;

export const nav = [
  { href: '/doctors/', label: 'Врачи' },
  { href: '/services/', label: 'Направления' },
  { href: '/services/#prices', label: 'Цены' },
  { href: '/checkup/', label: 'Чек-ап' },
  { href: '/contacts/', label: 'Контакты' },
] as const;
