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

const ORG_ID = '22544076845';

export const site = {
  name: 'Правильное лечение',
  fullName: 'Медицинский центр «Правильное лечение»',
  tagline: 'Врачи, которые объясняют',
  tz: 'Europe/Moscow',
  /** Первые два показываем в шапке. Третий — из карточки Яндекс Карт, на сайте клиники его нет. */
  phones: [
    { display: '+7 (495) 150-69-99', href: 'tel:+74951506999' },
    { display: '+7 (969) 150-69-99', href: 'tel:+79691506999' },
  ],
  extraPhones: [{ display: '+7 (495) 287-64-48', href: 'tel:+74952876448', note: '[актуален ли номер — уточнить]' }],
  email: '1506999@bk.ru',
  address: {
    street: 'Москва, Перовская ул., 66к3',
    zip: '111394',
    district: 'Перово, ВАО',
    mapsUrl: `https://yandex.ru/maps/org/${ORG_ID}/`,
    reviewsUrl: `https://yandex.ru/maps/org/${ORG_ID}/reviews/`,
    coords: [55.743504, 37.799209] as const,
  },
  rating: { value: 5.0, marks: 437, reviews: 278, source: 'Яндекс Карты' },
  /** Заявки уходят в Telegram: на сайте клиники мессенджер именно он. */
  messenger: {
    name: 'Telegram',
    phone: '79691506999',
    chatUrl: 'https://t.me/+79691506999',
  },
  social: { vk: 'https://vk.com/pravlech' },
  legalEntity: 'ООО «ПРАВИЛЬНОЕ ЛЕЧЕНИЕ», ОГРН 1187746154694',
  license: '[номер и дата лицензии — от клиента]',
  logoNote: '[логотип — от клиента]',
  founded: '[год основания — уточнить]',
  warning: 'Имеются противопоказания. Необходима консультация специалиста',
  weekendDiscount: 10,
  conceptNote: tp(
    'Концепт сайта, подготовлен для «Правильное лечение» студией Kovagor. Не является официальным сайтом компании',
  ),
  misNote: '[интеграция с МИС — после запуска]',
  officialSite: 'https://pravlech.ru',
  policyUrl: 'https://pravlech.ru/politika-konfidenczialnosti/',
  pdnRulesUrl: 'https://pravlech.ru/pravila-obrabotki-personalnyh-dannyh/',
  hours,
} as const;

/** Как добраться — с официальной страницы «Контакты». */
export const howToGet = [
  { from: 'МЦД-4 Кусково', how: '8 минут пешком' },
  { from: 'МЦД-4 Новогиреево', how: 'автобус 842 или 254 до остановки «Новотетёрки», дальше 300 м; пешком около 17 минут' },
  { from: 'м. Перово', how: 'последний вагон из центра, выход 4; автобус 842, 314, 617, 787, 7, 620 или Т53 до «Новотетёрки»; пешком около 21 минуты' },
  { from: 'м. Новогиреево', how: 'первый вагон из центра, выход 2; автобус 617; пешком около 23 минут' },
  { from: 'м. Выхино', how: 'последний вагон из центра, выход 4; автобус 620' },
] as const;

export const nav = [
  { href: '/doctors/', label: 'Врачи' },
  { href: '/services/', label: 'Направления' },
  { href: '/services/#prices', label: 'Цены' },
  { href: '/checkup/', label: 'Чек-ап' },
  { href: '/contacts/', label: 'Контакты' },
] as const;
