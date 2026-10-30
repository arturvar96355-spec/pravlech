export type Credit = { file: string; what: string; author: string; source: string; license: string };

/**
 * Источники стоковых изображений.
 * В демо-проекте стоковых фото нет: иллюстрации и аватары нарисованы вручную (SVG).
 * При добавлении фото в /public/img — внести сюда автора, ссылку и лицензию (Unsplash / Pexels).
 */
export const credits: Credit[] = [
  {
    file: '/img/doctors/*.svg',
    what: 'Аватары врачей (10 шт.)',
    author: 'Нарисованы для этого проекта',
    source: 'scripts/avatars.mjs',
    license: 'Собственные иллюстрации проекта, реальных людей не изображают',
  },
];

export const photoSlots = [
  '[фото центра: светлый кабинет — добавить]',
  '[фото центра: приёмная — добавить]',
  '[фото врачей — добавить]',
] as const;
