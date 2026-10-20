const Q = '[цитата из отзыва на Яндекс Картах — подобрать]';

export type ReviewSlot = { id: string; text: string; author: string; about?: string };

export const reviewAuthor = 'Отзыв на Яндекс Картах';

/** По одному слоту на каждого из пяти названных специалистов + три общих. */
export const reviews: ReviewSlot[] = [
  { id: 'r-vardanyan', text: Q, author: reviewAuthor, about: 'о враче: А. Г. Варданян, кардиолог' },
  { id: 'r-ermoshkina', text: Q, author: reviewAuthor, about: 'о враче: Н. Ю. Ермошкина, невролог' },
  { id: 'r-salkaev', text: Q, author: reviewAuthor, about: 'о враче: М. Р. Салькаев, ЛОР' },
  { id: 'r-vitushkina', text: Q, author: reviewAuthor, about: 'о враче: Ю. Витушкина, ЛОР' },
  { id: 'r-goar', text: Q, author: reviewAuthor, about: 'о Гоар, процедурный кабинет' },
  { id: 'r-general-1', text: Q, author: reviewAuthor },
  { id: 'r-general-2', text: Q, author: reviewAuthor },
  { id: 'r-general-3', text: Q, author: reviewAuthor },
];

export type WhyCard = { id: string; title: string; text: string; icon: 'message' | 'check' | 'clock' | 'sparkle'; quote: string };

export const whyCards: WhyCard[] = [
  { id: 'explain', title: 'Объясняют', text: 'Врач рассказывает, что и зачем, простыми словами.', icon: 'message', quote: Q },
  { id: 'nothing-extra', title: 'Не назначают лишнего', text: 'Анализы и обследования — только по необходимости.', icon: 'check', quote: Q },
  { id: 'no-queue', title: 'Без очередей', text: 'Приём в назначенное время.', icon: 'clock', quote: Q },
  { id: 'clean', title: 'Чисто и спокойно', text: 'Светлые кабинеты, тихо, никакой суеты.', icon: 'sparkle', quote: Q },
];

export const returnTheme =
  'Многие ходят к «своему» врачу годами и приводят семью.';
