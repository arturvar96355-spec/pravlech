import type { TopicId } from './reviews';

/**
 * Числа из выгрузки отзывов Яндекс Карт: 150 из 278 отзывов, просмотрены 20.10.2026.
 * Значения приблизительные («около»): так их дал разбор отзывов.
 */
export const statsNote = '150 из 278 отзывов на Яндекс Картах, просмотрены 20.10.2026. Числа приблизительные.';

export type ThemeStat = { id: TopicId; label: string; value: number; approx: true };

export const themeStats: ThemeStat[] = [
  { id: 'explain', label: 'Врач подробно объясняет', value: 40, approx: true },
  { id: 'no-extra', label: 'Не навязывают лишнего', value: 15, approx: true },
  { id: 'no-queue', label: 'Без очередей, по времени записи', value: 15, approx: true },
];

export type MentionStat = { slug: string; label: string; value: number; display?: string };

/** Сколько отзывов среди 150 просмотренных называют врача. */
export const mentionStats: MentionStat[] = [
  { slug: 'vardanyan-argishti-gagikovich', label: 'А. Г. Варданян', value: 51 },
  { slug: 'salkaev-marat-ravilovich', label: 'М. Р. Салькаев', value: 12 },
  { slug: 'ermoshkina-natalya-yurevna', label: 'Н. Ю. Ермошкина', value: 11 },
  { slug: 'goar', label: 'Гоар (процедурный кабинет)', value: 7 },
  { slug: 'vitushkina-yuliya-valerevna', label: 'Ю. В. Витушкина', value: 4 },
  { slug: 'sarkisyan-anait-pavlovna', label: 'А. П. Саркисян', value: 4 },
  { slug: 'yasinskaya-svetlana-borisovna', label: 'С. Б. Ясинская', value: 2 },
  { slug: 'glazovskaya-olga-vadimovna', label: 'О. В. Глазовская', value: 2, display: '1–2' },
  { slug: 'krizmanich-mariya-pavlovna', label: 'М. П. Кризманич', value: 1 },
  { slug: 'salaeva-gyunaj-damirovna', label: 'Г. Д. Салаева', value: 0 },
];
