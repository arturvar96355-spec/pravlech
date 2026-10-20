export type SpecialtyId = 'cardio' | 'neuro' | 'lor' | 'procedure' | 'other';

export type Doctor = {
  slug: string;
  name: string;
  specialty: string;
  specialtyId: SpecialtyId;
  /** true — имя реального специалиста из карточки Яндекс Карт */
  named: boolean;
  /** Сколько раз называют в отзывах, если известно */
  mentions?: string;
  initials: string;
  quote: string;
  photo?: string;
  experience: string;
  education: string;
  /** id услуги для записи и цены (см. services.ts) */
  serviceId: string;
};

const QUOTE = '[цитата из отзыва на Яндекс Картах — подобрать]';
const EXP = '[стаж — уточнить]';
const EDU = '[образование, категории — уточнить]';

export const specialties: Array<{ id: SpecialtyId | 'all'; label: string }> = [
  { id: 'all', label: 'Все' },
  { id: 'cardio', label: 'Кардиолог' },
  { id: 'neuro', label: 'Невролог' },
  { id: 'lor', label: 'ЛОР' },
  { id: 'procedure', label: 'Процедурный кабинет' },
];

export const doctors: Doctor[] = [
  {
    slug: 'vardanyan-a-g',
    name: 'Аргишти Гагикович Варданян',
    specialty: 'Кардиолог',
    specialtyId: 'cardio',
    named: true,
    mentions: '≈15 упоминаний в отзывах',
    initials: 'АВ',
    quote: QUOTE,
    experience: EXP,
    education: EDU,
    serviceId: 'cardio',
  },
  {
    slug: 'ermoshkina-n-yu',
    name: 'Н. Ю. Ермошкина',
    specialty: 'Невролог',
    specialtyId: 'neuro',
    named: true,
    initials: 'НЕ',
    quote: QUOTE,
    experience: EXP,
    education: EDU,
    serviceId: 'neuro',
  },
  {
    slug: 'salkaev-m-r',
    name: 'М. Р. Салькаев',
    specialty: 'Оториноларинголог (ЛОР)',
    specialtyId: 'lor',
    named: true,
    initials: 'МС',
    quote: QUOTE,
    experience: EXP,
    education: EDU,
    serviceId: 'lor',
  },
  {
    slug: 'vitushkina-yu',
    name: 'Ю. Витушкина',
    specialty: 'Оториноларинголог (ЛОР)',
    specialtyId: 'lor',
    named: true,
    initials: 'ЮВ',
    quote: QUOTE,
    experience: EXP,
    education: EDU,
    serviceId: 'lor',
  },
  {
    slug: 'goar',
    name: 'Гоар',
    specialty: 'Медсестра процедурного кабинета',
    specialtyId: 'procedure',
    named: true,
    initials: 'Г',
    quote: QUOTE,
    experience: EXP,
    education: EDU,
    serviceId: 'labs',
  },
  ...Array.from({ length: 5 }, (_, i): Doctor => ({
    slug: `doctor-${i + 5}`,
    name: '[имя — перенести с сайта]',
    specialty: '[специализация — перенести с сайта]',
    specialtyId: 'other',
    named: false,
    initials: '··',
    quote: QUOTE,
    experience: EXP,
    education: EDU,
    serviceId: 'therapist',
  })),
];

export const featuredHeroDoctors = ['vardanyan-a-g', 'ermoshkina-n-yu', 'salkaev-m-r'] as const;

export function getDoctor(slug: string): Doctor | undefined {
  return doctors.find((d) => d.slug === slug);
}

/** Общий перечень обращений по специальности (не диагнозы). */
export const scopeBySpecialty: Record<SpecialtyId, string[]> = {
  cardio: [
    'Повышенное или нестабильное давление',
    'Боль или дискомфорт в области сердца',
    'Одышка, перебои в работе сердца',
    'Наблюдение после лечения, ЭхоКГ',
  ],
  neuro: [
    'Головная боль, головокружение',
    'Боль в спине и шее',
    'Онемение рук и ног',
    'Нарушения сна, постоянная усталость',
  ],
  lor: [
    'Боль в горле, насморк, заложенность носа',
    'Боль в ухе, снижение слуха',
    'Частые простуды',
    'Осмотр и промывания по назначению врача',
  ],
  procedure: ['Забор крови', 'Процедуры по назначению врача'],
  other: ['[перечень обращений — уточнить]'],
};
