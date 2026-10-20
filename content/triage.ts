export type TriageOption = {
  id: string;
  chip: string;
  /** id услуги из services.ts */
  serviceId: string;
  /** Что сказать пациенту: только «к какому врачу», без диагнозов */
  hint: string;
};

export const triage: TriageOption[] = [
  { id: 'heart', chip: 'Давление, сердце', serviceId: 'cardio', hint: 'С этим обычно идут к кардиологу.' },
  { id: 'head', chip: 'Головная боль, головокружение', serviceId: 'neuro', hint: 'С этим обычно идут к неврологу.' },
  { id: 'back', chip: 'Боль в спине, онемение', serviceId: 'neuro', hint: 'С этим обычно идут к неврологу.' },
  { id: 'ent', chip: 'Ухо, горло, нос', serviceId: 'lor', hint: 'С этим идут к оториноларингологу (ЛОР). Принимают взрослых и детей.' },
  { id: 'us', chip: 'Нужно УЗИ', serviceId: 'us', hint: 'Запишем на УЗИ. Цена зависит от зоны. Если у Вас есть направление врача, возьмите его с собой.' },
  { id: 'labs', chip: 'Нужны анализы', serviceId: 'labs', hint: 'Кровь берут в процедурном кабинете. По выходным на анализы скидка 10%.' },
  { id: 'cert', chip: 'Справка / профосмотр', serviceId: 'spravki', hint: 'Справки оформляют в клинике: общая, в бассейн, 095/у. Какая справка нужна именно Вам, подскажет администратор.' },
  { id: 'unknown', chip: 'Не знаю, к кому идти', serviceId: 'therapist', hint: 'Начните с терапевта. Он выслушает и подскажет, к какому специалисту идти дальше.' },
];

export const forWhomTriage = [
  { id: 'self', label: 'Себе' },
  { id: 'child', label: 'Ребёнку' },
  { id: 'parent', label: 'Маме или папе' },
] as const;

export type TriageWhom = (typeof forWhomTriage)[number]['id'];

export const childNote = 'Приём детей по этому направлению уточните по телефону. [уточнить у клиники]';
export const parentNote = 'Можно записать родителя: в заявке укажите, что запись для него.';

export const triageDisclaimer =
  'Это подсказка, а не диагноз. Если сомневаетесь — позвоните, администратор подскажет.';
