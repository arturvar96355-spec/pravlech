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
  { id: 'ent', chip: 'Ухо, горло, нос', serviceId: 'lor', hint: 'С этим идут к оториноларингологу (ЛОР).' },
  { id: 'us', chip: 'Нужно УЗИ', serviceId: 'us', hint: 'Запишем на УЗИ. Направление врача — если оно у Вас есть, возьмите с собой.' },
  { id: 'labs', chip: 'Нужны анализы', serviceId: 'labs', hint: 'Кровь берут в процедурном кабинете.' },
  { id: 'cert', chip: 'Справка / профосмотр [уточнить]', serviceId: 'therapist', hint: 'Начнём с терапевта. Какие справки оформляются, подскажет администратор.' },
  { id: 'unknown', chip: 'Не знаю, к кому идти', serviceId: 'therapist', hint: 'Начните с терапевта. Он выслушает и подскажет, к какому специалисту идти дальше.' },
];

export const triageDisclaimer =
  'Это подсказка, а не диагноз. Если сомневаетесь — позвоните, администратор подскажет.';
