const Q = '[цитата из отзыва на Яндекс Картах — подобрать]';

export type Review = {
  id: string;
  /** Дословный фрагмент отзыва. Исправлены только явные опечатки. */
  text: string;
  /** Имя и первая буква фамилии, как на Картах */
  author: string;
  /** ММ.ГГГГ */
  date?: string;
  doctorSlug?: string;
  about?: string;
};

export const reviewSource = 'Отзыв на Яндекс Картах';

/**
 * Цитаты из отзывов на Яндекс Картах (выгрузка 20.10.2026, 150 из 278 отзывов).
 * Перед публикацией сверить с оригиналом и получить согласие клиники и авторов.
 */
export const reviewsVerified = false;

const V = 'vardanyan-argishti-gagikovich';
const E = 'ermoshkina-natalya-yurevna';
const S = 'salkaev-marat-ravilovich';
const VI = 'vitushkina-yuliya-valerevna';

export const reviews: Review[] = [
  // Варданян
  { id: 'v1', doctorSlug: V, author: 'Евгения Л.', date: '10.2024', text: 'Доктор действительно лечит и детально объясняет, почему назначен тот или иной препарат.' },
  { id: 'v2', doctorSlug: V, author: 'Геворк М.', date: '11.2025', text: 'Очень грамотный, внимательный и тактичный врач.' },
  { id: 'v3', doctorSlug: V, author: 'Лидия В.', date: '08.2025', text: 'Он действительно хочет помочь.' },
  { id: 'v4', doctorSlug: V, author: 'Катя С.', date: '04.2024', text: 'Аргишти Гагикович — человек с огромным сердцем, потрясающе чуткий и участливый.' },
  // Ермошкина
  { id: 'e1', doctorSlug: E, author: 'Ольга Т.', date: '12.2022', text: 'Консультация длилась более часа.' },
  { id: 'e2', doctorSlug: E, author: 'Наталья И.', date: '07.2022', text: 'Наталья Юрьевна ответила на все наши вопросы' },
  // Салькаев
  { id: 's1', doctorSlug: S, author: 'Maria C.', date: '10.2024', text: 'Меня принял замечательный врач Марат Равилович, всё подробно объяснил, обследовал, прописал лечение.' },
  { id: 's2', doctorSlug: S, author: 'Яна К.', date: '04.2023', text: 'Не посадил на антибиотики' },
  { id: 's3', doctorSlug: S, author: 'Людмила Л.', date: '12.2022', text: '…это настоящий доктор Айболит!)' },
  // Гоар
  { id: 'g1', doctorSlug: 'goar', author: 'Татьяна Д.', date: '10.2024', text: 'попадает в самые плохие вены с первого раза' },
  { id: 'g2', doctorSlug: 'goar', author: 'Нина', date: '12.2023', text: 'Особое уважение и признательность выражаю медсестре Гоар, которая фантастически делает уколы и ставит капельницы.' },
  // Остальные врачи
  { id: 'vi1', doctorSlug: VI, author: 'Ирина М.', date: '11.2024', text: 'Поставила верный диагноз, сразу же провела лечение (промывку уха) и дала рекомендации.' },
  { id: 'sa1', doctorSlug: 'sarkisyan-anait-pavlovna', author: 'Наталия', date: '02.2025', text: 'Очень грамотно и досконально осматривает' },
  { id: 'k1', doctorSlug: 'krizmanich-mariya-pavlovna', author: 'Алексей М.', date: '03.2025', text: 'Не просто решит проблему, но и все объяснит, подскажет, что делать дальше' },
  { id: 'gl1', doctorSlug: 'glazovskaya-olga-vadimovna', author: 'Алёна Н.', date: '12.2025', text: 'Осмотр и все манипуляции провела максимально аккуратно, без какого-либо дискомфорта.' },
  // О центре
  { id: 'c1', author: 'Нюра Я.', date: '08.2026', text: 'Цель действительно помочь пациенту, это редкость в наше время.' },
  { id: 'c2', author: 'Ирина К.', date: '04.2025', text: 'Здесь не коммерция и желание заработать побольше денег, здесь — главное пациент и помощь ему!' },
  { id: 'c3', author: 'Нина Л.', date: '07.2023', text: 'Лишних услуг и назначений анализов не навязывали, приятные цены, скидки на анализы.' },
  { id: 'c4', author: 'Евгения', date: '02.2024', text: 'Все нравится, все на уровне, спокойно, без толкучки, без спешки.' },
  { id: 'c5', author: 'Наталья К.', date: '04.2025', text: 'Всё сразу и в одном месте!', about: 'о семейном обследовании: анализы, УЗИ и врачи' },
];

/** Для карусели: общие отзывы и по одному-два о врачах. */
export const carouselIds = ['v1', 'c1', 'e1', 'c2', 's1', 'g2', 'c3', 'k1', 'c4', 'c5'] as const;

export const carousel: Review[] = carouselIds.map((id) => reviews.find((r) => r.id === id)!);

export function reviewsFor(slug: string): Review[] {
  return reviews.filter((r) => r.doctorSlug === slug);
}

export function quoteFor(slug: string): Review | undefined {
  return reviewsFor(slug)[0];
}

export type WhyCard = {
  id: string;
  title: string;
  text: string;
  icon: 'message' | 'check' | 'clock' | 'sparkle';
  /** Сколько из 150 просмотренных отзывов говорят об этом (по выгрузке, примерно) */
  stat?: string;
  quote: Review;
};


export const whyCards: WhyCard[] = [
  {
    id: 'explain',
    title: 'Объясняют',
    text: 'Врач рассказывает, что и зачем, простыми словами.',
    icon: 'message',
    stat: 'Это пишут примерно в 40 из 150 просмотренных отзывов',
    quote: { id: 'w1', author: 'Sofi L.', date: '03.2026', text: 'Подробно все рассказал, объяснил, остались только положительные впечатления.' },
  },
  {
    id: 'nothing-extra',
    title: 'Не назначают лишнего',
    text: 'Анализы и обследования — только по необходимости.',
    icon: 'check',
    stat: 'Около 15 из 150',
    quote: { id: 'w2', author: 'Алена З.', date: '04.2023', text: 'Самое главное все обследования и анализы назначаются строго необходимые по состоянию здоровья.' },
  },
  {
    id: 'no-queue',
    title: 'Без очередей',
    text: 'Приём в назначенное время.',
    icon: 'clock',
    stat: 'Около 15 из 150',
    quote: { id: 'w3', author: 'Антон С.', date: '06.2023', text: 'ждать не пришлось, ровно по времени записи приняли' },
  },
  {
    id: 'clean',
    title: 'Чисто и спокойно',
    text: 'Светлые кабинеты, тихо, никакой суеты.',
    icon: 'sparkle',
    quote: { id: 'w4', author: 'Любовь Ш.', date: '05.2024', text: 'Очень чистый, атмосфера дружелюбная.' },
  },
];

export const returnTheme = 'Многие ходят к «своему» врачу годами и приводят семью.';
export const whyNote = 'Цифры — по 150 отзывам на Яндекс Картах, которые мы просмотрели 20.10.2026 (всего их 278).';

export const placeholderQuote = Q;
