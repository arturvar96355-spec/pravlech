const Q = '[пример отзыва — добавить]';

export type Review = {
  id: string;
  /** Вымышленный текст для демо */
  text: string;
  /** Вымышленный автор */
  author: string;
  /** ММ.ГГГГ */
  date?: string;
  doctorSlug?: string;
  about?: string;
  /** Темы, о которых говорит отзыв */
  topics?: TopicId[];
};

export type TopicId = 'explain' | 'no-extra' | 'no-queue' | 'clean' | 'care' | 'one-place';

export const reviewSource = 'Пример отзыва';

/** Все отзывы вымышлены: демо-проект для портфолио. */
export const reviewsVerified = false;

const V = 'lavrov-igor-sergeevich';
const E = 'morozova-elena-viktorovna';
const S = 'gromov-andrey-nikolaevich';
const VI = 'belova-tatyana-andreevna';

export const reviews: Review[] = [
  // Лавров
  { id: 'v1', topics: ['explain'], doctorSlug: V, author: 'Анна К.', date: '03.2026', text: 'Врач подробно объяснил, зачем назначено каждое лекарство и как понять, что лечение работает.' },
  { id: 'v2', topics: ['care'], doctorSlug: V, author: 'Сергей М.', date: '02.2026', text: 'Внимательный и спокойный врач, выслушал до конца и не торопил.' },
  { id: 'v3', topics: ['care'], doctorSlug: V, author: 'Ирина В.', date: '12.2025', text: 'После приёма осталось ощущение, что мне действительно хотят помочь.' },
  { id: 'v4', topics: ['explain'], doctorSlug: V, author: 'Павел С.', date: '09.2025', text: 'Расшифровал кардиограмму простыми словами и нарисовал, что именно проверяли.' },
  // Морозова
  { id: 'e1', topics: ['explain'], doctorSlug: E, author: 'Ольга Т.', date: '01.2026', text: 'Консультация длилась больше часа, на все вопросы получила ответы.' },
  { id: 'e2', topics: ['explain'], doctorSlug: E, author: 'Наталья И.', date: '11.2025', text: 'Спокойно разобрала мои жалобы и объяснила план обследования по шагам.' },
  // Громов
  { id: 's1', topics: ['explain'], doctorSlug: S, author: 'Мария Д.', date: '02.2026', text: 'Всё подробно объяснил, осмотрел и рассказал, как ухаживать дома.' },
  { id: 's2', topics: ['no-extra'], doctorSlug: S, author: 'Яна Р.', date: '10.2025', text: 'Не назначил ничего лишнего, только то, что действительно нужно.' },
  { id: 's3', topics: ['care'], doctorSlug: S, author: 'Людмила Н.', date: '08.2025', text: 'Нашёл подход к ребёнку, дочь шла на приём без страха.' },
  // Ирина
  { id: 'g1', topics: ['care'], doctorSlug: 'irina', author: 'Татьяна Б.', date: '01.2026', text: 'Берёт кровь аккуратно и быстро, почти не почувствовала.' },
  { id: 'g2', topics: ['care'], doctorSlug: 'irina', author: 'Нина А.', date: '12.2025', text: 'Очень доброжелательная медсестра, всё объясняет перед процедурой.' },
  // Остальные врачи
  { id: 'vi1', topics: ['explain'], doctorSlug: VI, author: 'Елена М.', date: '02.2026', text: 'Внимательно осмотрела ребёнка и подробно объяснила, что делать дальше.' },
  { id: 'sa1', topics: ['care'], doctorSlug: 'zorina-marina-leonidovna', author: 'Наталия Ф.', date: '03.2026', text: 'Осмотр очень тщательный, всё показала на экране и прокомментировала.' },
  { id: 'k1', topics: ['explain'], doctorSlug: 'rudenko-alina-olegovna', author: 'Алексей Г.', date: '01.2026', text: 'Не просто назначила лечение, а объяснила, как ухаживать за кожей дальше.' },
  { id: 'gl1', topics: ['care'], doctorSlug: 'koltsova-viktoriya-andreevna', author: 'Алёна П.', date: '12.2025', text: 'Осмотр прошёл аккуратно и без дискомфорта, врач всё пояснила.' },
  // О центре
  { id: 'c1', topics: ['care'], author: 'Виктор Я.', date: '02.2026', text: 'Чувствуется, что цель врачей — помочь пациенту, а не продать побольше услуг.' },
  { id: 'c2', topics: ['no-extra'], author: 'Ирина К.', date: '03.2026', text: 'Лишних анализов не навязывали, а цены в прайсе совпали с тем, что назвали в регистратуре.' },
  { id: 'c3', topics: ['no-extra'], author: 'Нина Л.', date: '11.2025', text: 'Назначили только необходимое и объяснили, зачем каждое обследование.' },
  { id: 'c4', topics: ['no-queue'], author: 'Евгения С.', date: '01.2026', text: 'Спокойно, без толкотни и спешки, приём начался вовремя.' },
  { id: 'c5', topics: ['one-place'], author: 'Наталья Ч.', date: '12.2025', text: 'Всё сразу и в одном месте: врач, УЗИ и анализы за один визит.', about: 'о семейном чек-апе' },
  { id: 'w1', topics: ['explain'], author: 'Софья Л.', date: '03.2026', text: 'Подробно всё рассказали и объяснили, ушла без тревоги и с понятным планом.' },
  { id: 'w2', topics: ['no-extra'], author: 'Алена З.', date: '02.2026', text: 'Обследования назначают строго по необходимости, без «на всякий случай».' },
  { id: 'w3', topics: ['no-queue'], author: 'Антон Б.', date: '04.2026', text: 'Ждать не пришлось, приняли ровно по времени записи.' },
  { id: 'w4', topics: ['clean'], author: 'Любовь Ш.', date: '01.2026', text: 'Чисто, тихо, дружелюбная атмосфера.' },
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

const byId = (id: string): Review => reviews.find((r) => r.id === id)!;

export type WhyCard = {
  id: string;
  title: string;
  text: string;
  icon: 'message' | 'check' | 'clock' | 'sparkle';
  /** Сколько из 150 отзывов говорят об этом (демо-данные) */
  stat?: string;
  quote: Review;
};


export const whyCards: WhyCard[] = [
  {
    id: 'explain',
    title: 'Объясняют',
    text: 'Врач рассказывает, что и зачем, простыми словами.',
    icon: 'message',
    stat: 'Это пишут примерно в 40 из 150 отзывов (демо)',
    quote: byId('w1'),
  },
  {
    id: 'nothing-extra',
    title: 'Не назначают лишнего',
    text: 'Анализы и обследования — только по необходимости.',
    icon: 'check',
    stat: 'Около 15 из 150',
    quote: byId('w2'),
  },
  {
    id: 'no-queue',
    title: 'Без очередей',
    text: 'Приём в назначенное время.',
    icon: 'clock',
    stat: 'Около 15 из 150',
    quote: byId('w3'),
  },
  {
    id: 'clean',
    title: 'Чисто и спокойно',
    text: 'Светлые кабинеты, тихо, никакой суеты.',
    icon: 'sparkle',
    quote: byId('w4'),
  },
];

export const returnTheme = 'Многие ходят к «своему» врачу годами и приводят семью.';
export const whyNote = 'Демо-данные: цифры и отзывы вымышлены.';

export const placeholderQuote = Q;
