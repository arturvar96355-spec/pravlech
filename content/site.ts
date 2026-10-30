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
  name: 'Ясный приём',
  fullName: 'Медицинский центр «Ясный приём»',
  tagline: 'Врачи, которые объясняют',
  tz: 'Europe/Moscow',
  /** Демо-номера: ни один не настоящий. */
  phones: [
    { display: '+7 (000) 000-00-00', href: 'tel:+70000000000' },
    { display: '+7 (000) 000-00-01', href: 'tel:+70000000001' },
  ],
  extraPhones: [] as Array<{ display: string; href: string; note: string }>,
  email: 'info@example.com',
  address: {
    street: 'Город N, ул. Примерная, 1',
    zip: '000000',
    district: 'Демо-адрес',
  },
  /** Демо-цифры: вымышленная клиника. */
  rating: { value: 4.9, marks: 312, reviews: 168, source: 'демо-данные' },
  /** Заявка копируется в буфер и открывается Telegram без чата: демо-проект ничего не отправляет. */
  messenger: {
    name: 'Telegram',
    chatUrl: 'https://t.me/',
  },
  legalEntity: 'ООО «ЯСНЫЙ ПРИЁМ» (вымышленная организация)',
  license: '[номер и дата лицензии — для боевого сайта]',
  logoNote: '[логотип — для боевого сайта]',
  founded: '[год основания — уточнить]',
  warning: 'Имеются противопоказания. Необходима консультация специалиста',
  weekendDiscount: 10,
  conceptNote: tp('Демо-проект для портфолио. Клиника, врачи, отзывы, адрес и контакты вымышлены'),
  misNote: '[интеграция с МИС — после запуска]',
  hours,
} as const;

/** Как добраться: вымышленные станции для демо. */
export const howToGet = [
  { id: 'central', short: 'Метро «Центральная»', from: 'метро «Центральная»', how: 'выход 2, затем 7 минут пешком (демо-данные)' },
  { id: 'park', short: 'Метро «Парковая»', from: 'метро «Парковая»', how: 'автобус 12 до остановки «Примерная», затем 200 м (демо-данные)' },
  { id: 'north', short: 'Станция «Северная»', from: 'станция «Северная»', how: 'выход к городу, затем 10 минут пешком (демо-данные)' },
] as const;

export const nav = [
  { href: '/doctors/', label: 'Врачи' },
  { href: '/services/', label: 'Направления' },
  { href: '/services/#prices', label: 'Цены' },
  { href: '/checkup/', label: 'Чек-ап' },
  { href: '/contacts/', label: 'Контакты' },
] as const;
