const Q = '[цитата из отзыва на Яндекс Картах — подобрать]';

export type ReviewSlot = { id: string; text: string; author: string; about?: string; doctorSlug?: string };

export const reviewAuthor = 'Отзыв на Яндекс Картах';

/** По одному слоту на каждого из пяти названных специалистов + три общих. */
export const reviews: ReviewSlot[] = [
  { id: 'r-vardanyan', doctorSlug: 'vardanyan-argishti-gagikovich', text: Q, author: reviewAuthor, about: 'о враче: А. Г. Варданян, кардиолог' },
  { id: 'r-ermoshkina', doctorSlug: 'ermoshkina-natalya-yurevna', text: Q, author: reviewAuthor, about: 'о враче: Н. Ю. Ермошкина, невролог' },
  { id: 'r-salkaev', doctorSlug: 'salkaev-marat-ravilovich', text: Q, author: reviewAuthor, about: 'о враче: М. Р. Салькаев, ЛОР' },
  { id: 'r-vitushkina', doctorSlug: 'vitushkina-yuliya-valerevna', text: Q, author: reviewAuthor, about: 'о враче: Ю. Витушкина, ЛОР' },
  { id: 'r-goar', doctorSlug: 'goar', text: Q, author: reviewAuthor, about: 'о Гоар, процедурный кабинет' },
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
