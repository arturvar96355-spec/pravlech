export type Credit = { file: string; what: string; author: string; source: string; license: string };

/**
 * Источники стоковых изображений.
 * В концепте стоковых фото нет: иллюстрации нарисованы вручную (SVG), люди — монограммы.
 * При добавлении фото в /public/img — внести сюда автора, ссылку и лицензию (Unsplash / Pexels).
 */
export const credits: Credit[] = [
  {
    file: '/img/doctors/*.webp',
    what: 'Фото врачей (9 шт.)',
    author: 'Медицинский центр «Правильное лечение»',
    source: 'https://pravlech.ru/mastera/',
    license: 'Предоставлены клиникой, публикуются на её сайте',
  },
];

export const photoSlots = [
  '[фото центра: светлый кабинет — от клиента или Unsplash/Pexels]',
  '[фото центра: приёмная — от клиента]',
  '[фото врачей — от клиента]',
] as const;
