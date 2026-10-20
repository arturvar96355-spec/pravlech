export type Credit = { file: string; what: string; author: string; source: string; license: string };

/**
 * Источники стоковых изображений.
 * В концепте стоковых фото нет: иллюстрации нарисованы вручную (SVG), люди — монограммы.
 * При добавлении фото в /public/img — внести сюда автора, ссылку и лицензию (Unsplash / Pexels).
 */
export const credits: Credit[] = [];

export const photoSlots = [
  '[фото центра: светлый кабинет — от клиента или Unsplash/Pexels]',
  '[фото центра: приёмная — от клиента]',
  '[фото врачей — от клиента]',
] as const;
