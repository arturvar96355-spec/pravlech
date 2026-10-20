export type Credit = { file: string; what: string; author: string; source: string; license: string };

/** Источники стоковых изображений. Заполняется по мере добавления фото в /public/img. */
export const credits: Credit[] = [];
