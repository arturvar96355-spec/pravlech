import type { TopicId } from './reviews';

/**
 * Демо-числа вымышленной клиники, нужны только для показа блока.
 */
export const statsNote = 'Демо-данные: числа и отзывы вымышлены, клиника не существует.';

export type ThemeStat = { id: TopicId; label: string; value: number; approx: true };

export const themeStats: ThemeStat[] = [
  { id: 'explain', label: 'Врач подробно объясняет', value: 40, approx: true },
  { id: 'no-extra', label: 'Не навязывают лишнего', value: 15, approx: true },
  { id: 'no-queue', label: 'Без очередей, по времени записи', value: 15, approx: true },
];

export type MentionStat = { slug: string; label: string; value: number; display?: string };

/** Сколько отзывов среди 150 просмотренных называют врача. */
export const mentionStats: MentionStat[] = [
  { slug: 'lavrov-igor-sergeevich', label: 'И. С. Лавров', value: 51 },
  { slug: 'gromov-andrey-nikolaevich', label: 'А. Н. Громов', value: 12 },
  { slug: 'morozova-elena-viktorovna', label: 'Е. В. Морозова', value: 11 },
  { slug: 'irina', label: 'Ирина (процедурный кабинет)', value: 7 },
  { slug: 'belova-tatyana-andreevna', label: 'Т. А. Белова', value: 4 },
  { slug: 'zorina-marina-leonidovna', label: 'М. Л. Зорина', value: 4 },
  { slug: 'tikhonova-ksenia-pavlovna', label: 'К. П. Тихонова', value: 2 },
  { slug: 'koltsova-viktoriya-andreevna', label: 'В. А. Кольцова', value: 2, display: '1–2' },
  { slug: 'rudenko-alina-olegovna', label: 'А. О. Руденко', value: 1 },
  { slug: 'mirova-darya-sergeevna', label: 'Д. С. Мирова', value: 0 },
];
