export type SpecialtyId = 'cardio' | 'neuro' | 'lor' | 'gyn' | 'endo' | 'us' | 'derm' | 'procedure';

export type DoctorPhoto = { src: string; width: number; height: number };

export type DoctorSection = { title: string; items: string[] };

export type Doctor = {
  slug: string;
  name: string;
  specialty: string;
  /** Должность и степень, если есть */
  role?: string;
  specialtyId: SpecialtyId;
  /** Упоминается в примерах отзывов */
  named: boolean;
  mentions?: string;
  /** Принимает детей — только если так указано на сайте клиники */
  acceptsChildren?: boolean;
  initials: string;
  photo?: DoctorPhoto;
  quote: string;
  experience: string;
  education: string[];
  courses?: string[];
  /** Чем занимается врач (по данным клиники) */
  interests: string[];
  /** Методы, процедуры */
  methods?: string[];
  /** Дополнительные блоки профиля */
  extra?: DoctorSection[];
  /** id направления для цены и записи (см. services.ts) */
  serviceId: string;
  /** «к кардиологу …» — для текста заявки */
  bookingPhrase: string;
};

const QUOTE = '[пример отзыва — добавить]';
/** Нарисованные аватары (SVG), реальных людей на сайте нет */
const photo = (slug: string, size: number): DoctorPhoto => ({ src: `/img/doctors/${slug}.svg`, width: size, height: size });

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
    slug: 'lavrov-igor-sergeevich',
    name: 'Игорь Сергеевич Лавров',
    specialty: 'Кардиолог, терапевт',
    role: 'Главный врач, к.м.н.',
    specialtyId: 'cardio',
    named: true,
    mentions: 'Пример: упомянут в 51 из 150 отзывов',
    initials: 'ИЛ',
    photo: photo('lavrov-igor-sergeevich', 320),
    quote: QUOTE,
    experience: '13 лет',
    education: [
      '2006–2012 — медицинский университет, лечебное дело',
      '2012–2014 — ординатура по кардиологии',
    ],
    courses: [
      '2023 — повышение квалификации: кардиология',
      '2021 — клиническая фармакология',
      '2019 — функциональная диагностика',
    ],
    interests: [
      'Ведение амбулаторных пациентов общетерапевтического профиля',
      'Интерпретация лабораторных анализов и результатов инструментальных исследований',
      'Выполнение и расшифровка ЭКГ, холтеровского мониторирования, СМАД',
      'Диагностика и лечение артериальной гипертензии',
    ],
    serviceId: 'cardio',
    bookingPhrase: 'к кардиологу Игорю Сергеевичу Лаврову',
  },
  {
    slug: 'morozova-elena-viktorovna',
    name: 'Елена Викторовна Морозова',
    specialty: 'Невролог',
    role: 'К.м.н., доцент',
    specialtyId: 'neuro',
    named: true,
    mentions: 'Пример: упомянута в 11 из 150 отзывов',
    initials: 'ЕМ',
    photo: photo('morozova-elena-viktorovna', 320),
    quote: QUOTE,
    experience: '25 лет',
    education: [
      '1996–2002 — медицинский университет, лечебное дело',
      '2002–2004 — ординатура по неврологии',
    ],
    courses: [
      '2023 — конференция по лечению головной боли',
      '2021 — школа «Заболевания позвоночника: командный подход»',
      '2019 — МРТ-диагностика в неврологии',
    ],
    interests: [
      'Головная боль и головокружение',
      'Диагностика и лечение хронических заболеваний нервной системы',
    ],
    serviceId: 'neuro',
    bookingPhrase: 'к неврологу Елене Викторовне Морозовой',
  },
  {
    slug: 'gromov-andrey-nikolaevich',
    name: 'Андрей Николаевич Громов',
    specialty: 'Оториноларинголог (ЛОР)',
    specialtyId: 'lor',
    named: true,
    mentions: 'Пример: упомянут в 12 из 150 отзывов',
    initials: 'АГ',
    photo: photo('gromov-andrey-nikolaevich', 320),
    quote: QUOTE,
    experience: '30 лет',
    education: ['1990–1996 — медицинский университет, лечебное дело'],
    courses: [
      '2022 — основы эндоскопической оториноларингологии',
      '2019 — оториноларингология',
    ],
    interests: [
      'Ведение амбулаторных пациентов по профилю «оториноларингология»',
      'Интерпретация данных лабораторных и инструментальных методов исследования',
    ],
    serviceId: 'lor',
    bookingPhrase: 'к оториноларингологу Андрею Николаевичу Громову',
  },
  {
    slug: 'belova-tatyana-andreevna',
    name: 'Татьяна Андреевна Белова',
    specialty: 'Оториноларинголог (ЛОР), детский и взрослый',
    specialtyId: 'lor',
    named: true,
    acceptsChildren: true,
    mentions: 'Пример: упомянута в 4 из 150 отзывов',
    initials: 'ТБ',
    photo: photo('belova-tatyana-andreevna', 320),
    quote: QUOTE,
    experience: '28 лет',
    education: [
      '1992–1998 — медицинский университет, педиатрия',
      '2000 — переподготовка по оториноларингологии',
    ],
    courses: ['2022 — оториноларингология', '2018 — детская оториноларингология'],
    interests: ['Заболевания органов дыхания и слуха у детей и взрослых'],
    serviceId: 'lor',
    bookingPhrase: 'к оториноларингологу Татьяне Андреевне Беловой',
  },
  {
    slug: 'irina',
    name: 'Ирина',
    specialty: 'Медсестра процедурного кабинета',
    specialtyId: 'procedure',
    named: true,
    mentions: 'Пример: упомянута в 7 из 150 отзывов',
    initials: 'И',
    photo: photo('irina', 320),
    quote: QUOTE,
    experience: '[стаж — уточнить]',
    education: ['[образование — уточнить]'],
    interests: ['Забор крови', 'Инъекции по назначению врача', 'Капельницы по назначению врача'],
    serviceId: 'labs',
    bookingPhrase: 'в процедурный кабинет к Ирине',
  },
  {
    slug: 'rudenko-alina-olegovna',
    name: 'Алина Олеговна Руденко',
    specialty: 'Дерматовенеролог, трихолог',
    specialtyId: 'derm',
    named: false,
    initials: 'АР',
    photo: photo('rudenko-alina-olegovna', 320),
    quote: QUOTE,
    experience: '14 лет',
    education: ['2011 — медицинский университет, лечебное дело'],
    courses: ['2022 — дерматовенерология', '2020 — косметология'],
    interests: [
      'Лечение заболеваний кожи, ногтей, волос',
      'Удаление доброкачественных образований кожи',
      'Уходовая и аппаратная косметология',
    ],
    methods: [
      'Дерматоскопия',
      'Осмотр лампой Вуда',
      'Удаление бородавок и доброкачественных новообразований кожи',
      'Биоревитализация и мезотерапия',
      'Лечение себорейного дерматита',
      'Плазмолифтинг для волос',
    ],
    serviceId: 'derm',
    bookingPhrase: 'к дерматовенерологу Алине Олеговне Руденко',
  },
  {
    slug: 'zorina-marina-leonidovna',
    name: 'Марина Леонидовна Зорина',
    specialty: 'Врач ультразвуковой диагностики',
    role: 'Врач высшей категории, акушер-гинеколог',
    specialtyId: 'us',
    named: false,
    initials: 'МЗ',
    photo: photo('zorina-marina-leonidovna', 320),
    quote: QUOTE,
    experience: '29 лет',
    education: [
      '1990–1996 — медицинский университет, лечебное дело',
      '1996–1998 — клиническая ординатура по акушерству и гинекологии',
    ],
    courses: [
      'Эхокардиография взрослых и детей',
      'Комплексное ультразвуковое исследование сосудистой системы',
      'Допплерография в акушерской практике',
    ],
    interests: [
      'УЗИ органов брюшной полости и забрюшинного пространства',
      'УЗИ в урологии, гинекологии и акушерстве',
      'УЗИ молочных желёз, щитовидной железы, лимфоузлов и мягких тканей',
      'Допплерография сосудов',
      'УЗИ у детей: нейросонография, тазобедренные суставы, органы брюшной полости',
    ],
    serviceId: 'us',
    bookingPhrase: 'на УЗИ к Марине Леонидовне Зориной',
  },
  {
    slug: 'tikhonova-ksenia-pavlovna',
    name: 'Ксения Павловна Тихонова',
    specialty: 'Эндокринолог',
    specialtyId: 'endo',
    named: false,
    initials: 'КТ',
    photo: photo('tikhonova-ksenia-pavlovna', 320),
    quote: QUOTE,
    experience: '27 лет',
    education: [
      '1992–1998 — медицинский университет, лечебное дело',
      '1998–2000 — интернатура по эндокринологии',
    ],
    courses: ['2022 — психосоматические аспекты эндокринных заболеваний', '2019 — заболевания щитовидной железы'],
    interests: ['Сахарный диабет, заболевания щитовидной железы, остеопороз, заболевания надпочечников'],
    serviceId: 'endo',
    bookingPhrase: 'к эндокринологу Ксении Павловне Тихоновой',
  },
  {
    slug: 'mirova-darya-sergeevna',
    name: 'Дарья Сергеевна Мирова',
    specialty: 'Акушер-гинеколог, репродуктолог',
    specialtyId: 'gyn',
    named: false,
    initials: 'ДМ',
    photo: photo('mirova-darya-sergeevna', 320),
    quote: QUOTE,
    experience: '15 лет',
    education: [
      '2010 — медицинский университет, лечебное дело',
      '2011 — клиническая ординатура по акушерству и гинекологии',
    ],
    courses: ['2022 — ультразвуковая диагностика', '2019 — вспомогательные репродуктивные технологии'],
    interests: [
      'Планирование беременности',
      'Комплексное обследование при бесплодии',
      'Диагностика причин невынашивания беременности',
    ],
    methods: ['Внутриматочная инсеминация', 'Гидросонография', 'Планирование беременности', 'Сохранение фертильности'],
    serviceId: 'gyn',
    bookingPhrase: 'к акушеру-гинекологу Дарье Сергеевне Мировой',
  },
  {
    slug: 'koltsova-viktoriya-andreevna',
    name: 'Виктория Андреевна Кольцова',
    specialty: 'Акушер-гинеколог, врач УЗД',
    specialtyId: 'gyn',
    named: false,
    initials: 'ВК',
    photo: photo('koltsova-viktoriya-andreevna', 320),
    quote: QUOTE,
    experience: '10 лет',
    education: [
      '2015 — медицинский университет, лечебное дело',
      '2017 — клиническая ординатура по акушерству и гинекологии',
    ],
    courses: ['2024 — основы кольпоскопии', '2023 — ультразвуковая диагностика', '2022 — сердечно-лёгочная реанимация, базовый курс'],
    interests: [
      'Планирование беременности и подготовка к ней',
      'Консультирование и подбор контрацепции',
      'Патология шейки матки',
      'Гормональные нарушения репродуктивного и перименопаузального периода',
      'Ультразвуковая диагностика в гинекологии',
    ],
    serviceId: 'gyn',
    bookingPhrase: 'к акушеру-гинекологу Виктории Андреевне Кольцовой',
  },
];

export const featuredHeroDoctors = ['lavrov-igor-sergeevich', 'morozova-elena-viktorovna', 'gromov-andrey-nikolaevich'] as const;

export function getDoctor(slug: string): Doctor | undefined {
  return doctors.find((d) => d.slug === slug);
}
