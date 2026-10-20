export type SpecialtyId = 'cardio' | 'neuro' | 'lor' | 'gyn' | 'endo' | 'us' | 'derm' | 'procedure';

export type Doctor = {
  slug: string;
  name: string;
  specialty: string;
  /** Должность и степень, если есть */
  role?: string;
  specialtyId: SpecialtyId;
  /** Называют в отзывах на Яндекс Картах */
  named: boolean;
  mentions?: string;
  initials: string;
  quote: string;
  experience: string;
  education: string;
  /** id направления для цены и записи (см. services.ts) */
  serviceId: string;
  /** «к кардиологу …» — для текста заявки */
  bookingPhrase: string;
};

const QUOTE = '[цитата из отзыва на Яндекс Картах — подобрать]';
const EDU = '[образование, сертификаты — уточнить]';

export const specialties: Array<{ id: SpecialtyId | 'all'; label: string }> = [
  { id: 'all', label: 'Все' },
  { id: 'cardio', label: 'Кардиолог' },
  { id: 'neuro', label: 'Невролог' },
  { id: 'lor', label: 'ЛОР' },
  { id: 'gyn', label: 'Гинеколог' },
  { id: 'endo', label: 'Эндокринолог' },
  { id: 'us', label: 'УЗИ' },
  { id: 'derm', label: 'Дерматолог' },
  { id: 'procedure', label: 'Процедурный кабинет' },
];

export const doctors: Doctor[] = [
  {
    slug: 'vardanyan-argishti-gagikovich',
    name: 'Аргишти Гагикович Варданян',
    specialty: 'Кардиолог, терапевт',
    role: 'Главный врач, к.м.н., сотрудник кафедры клинической фармакологии РНИМУ им. Пирогова',
    specialtyId: 'cardio',
    named: true,
    mentions: '≈15 упоминаний в отзывах',
    initials: 'АВ',
    quote: QUOTE,
    experience: '13 лет',
    education: EDU,
    serviceId: 'cardio',
    bookingPhrase: 'к кардиологу Аргишти Гагиковичу Варданяну',
  },
  {
    slug: 'ermoshkina-natalya-yurevna',
    name: 'Наталья Юрьевна Ермошкина',
    specialty: 'Невролог',
    role: 'К.м.н., доцент кафедры неврологии ФУВ, ФДПО РНИМУ им. Пирогова',
    specialtyId: 'neuro',
    named: true,
    initials: 'НЕ',
    quote: QUOTE,
    experience: '40 лет',
    education: EDU,
    serviceId: 'neuro',
    bookingPhrase: 'к неврологу Наталье Юрьевне Ермошкиной',
  },
  {
    slug: 'salkaev-marat-ravilovich',
    name: 'Марат Равилович Салькаев',
    specialty: 'Оториноларинголог (ЛОР)',
    specialtyId: 'lor',
    named: true,
    initials: 'МС',
    quote: QUOTE,
    experience: '40 лет',
    education: EDU,
    serviceId: 'lor',
    bookingPhrase: 'к оториноларингологу Марату Равиловичу Салькаеву',
  },
  {
    slug: 'vitushkina-yuliya-valerevna',
    name: 'Юлия Валерьевна Витушкина',
    specialty: 'Оториноларинголог (ЛОР), детский и взрослый',
    specialtyId: 'lor',
    named: true,
    initials: 'ЮВ',
    quote: QUOTE,
    experience: '37 лет',
    education: EDU,
    serviceId: 'lor',
    bookingPhrase: 'к оториноларингологу Юлии Валерьевне Витушкиной',
  },
  {
    slug: 'goar',
    name: 'Гоар',
    specialty: 'Медсестра процедурного кабинета',
    specialtyId: 'procedure',
    named: true,
    initials: 'Г',
    quote: QUOTE,
    experience: '[стаж — уточнить]',
    education: EDU,
    serviceId: 'labs',
    bookingPhrase: 'в процедурный кабинет к Гоар',
  },
  {
    slug: 'krizmanich-mariya-pavlovna',
    name: 'Мария Павловна Кризманич',
    specialty: 'Дерматовенеролог, трихолог',
    specialtyId: 'derm',
    named: false,
    initials: 'МК',
    quote: QUOTE,
    experience: '14 лет',
    education: EDU,
    serviceId: 'derm',
    bookingPhrase: 'к дерматовенерологу Марии Павловне Кризманич',
  },
  {
    slug: 'sarkisyan-anait-pavlovna',
    name: 'Анаит Павловна Саркисян',
    specialty: 'Врач ультразвуковой диагностики',
    role: 'Высшая категория',
    specialtyId: 'us',
    named: false,
    initials: 'АС',
    quote: QUOTE,
    experience: '29 лет',
    education: EDU,
    serviceId: 'us',
    bookingPhrase: 'на УЗИ к Анаит Павловне Саркисян',
  },
  {
    slug: 'yasinskaya-svetlana-borisovna',
    name: 'Светлана Борисовна Ясинская',
    specialty: 'Эндокринолог',
    specialtyId: 'endo',
    named: false,
    initials: 'СЯ',
    quote: QUOTE,
    experience: '27 лет',
    education: EDU,
    serviceId: 'endo',
    bookingPhrase: 'к эндокринологу Светлане Борисовне Ясинской',
  },
  {
    slug: 'salaeva-gyunay-damirovna',
    name: 'Гюнай Дамировна Салаева',
    specialty: 'Акушер-гинеколог, репродуктолог',
    specialtyId: 'gyn',
    named: false,
    initials: 'ГС',
    quote: QUOTE,
    experience: '15 лет',
    education: EDU,
    serviceId: 'gyn',
    bookingPhrase: 'к акушеру-гинекологу Гюнай Дамировне Салаевой',
  },
  {
    slug: 'glazovskaya-olga-vadimovna',
    name: 'Ольга Вадимовна Глазовская',
    specialty: 'Акушер-гинеколог, врач УЗД',
    specialtyId: 'gyn',
    named: false,
    initials: 'ОГ',
    quote: QUOTE,
    experience: '10 лет',
    education: EDU,
    serviceId: 'gyn',
    bookingPhrase: 'к акушеру-гинекологу Ольге Вадимовне Глазовской',
  },
];

export const featuredHeroDoctors = ['vardanyan-argishti-gagikovich', 'ermoshkina-natalya-yurevna', 'salkaev-marat-ravilovich'] as const;

export function getDoctor(slug: string): Doctor | undefined {
  return doctors.find((d) => d.slug === slug);
}

/** Общий перечень обращений по специальности (не диагнозы). */
export const scopeBySpecialty: Record<SpecialtyId, string[]> = {
  cardio: ['Повышенное или нестабильное давление', 'Боль или дискомфорт в области сердца', 'Одышка, перебои в работе сердца', 'ЭКГ, холтер, ЭхоКГ, наблюдение'],
  neuro: ['Головная боль, головокружение', 'Боль в спине и шее', 'Онемение рук и ног', 'Нарушения сна, постоянная усталость'],
  lor: ['Боль в горле, насморк, заложенность носа', 'Боль в ухе, снижение слуха', 'Серные пробки, промывание миндалин', 'Приём взрослых и детей'],
  gyn: ['Плановый осмотр и мазки', 'Планирование беременности', 'Нарушения менструального цикла', 'Консультация репродуктолога'],
  endo: ['Щитовидная железа', 'Сахар и обмен веществ', 'Консультация по результатам гормональных анализов', 'Лишний вес'],
  us: ['УЗИ органов брюшной полости и малого таза', 'УЗИ щитовидной и молочных желёз', 'УЗИ сосудов', 'УЗИ почек и суставов'],
  derm: ['Осмотр родинок и дерматоскопия', 'Удаление родинок и бородавок', 'Чистка лица и пилинги', 'Консультация трихолога'],
  procedure: ['Забор крови', 'Инъекции по назначению врача', 'Капельницы по назначению врача'],
};
