export type Promo = {
  id: string;
  title: string;
  /** Короткий бейдж: цена или скидка */
  badge: string;
  text?: string;
  serviceId: string;
};

/** Акции с pravlech.ru (раздел «Акции»). Сроков действия на сайте клиники нет. */
export const promoTerm = '[срок действия — уточнить]';

export const promos: Promo[] = [
  { id: 'ecg', title: 'ЭКГ с расшифровкой', badge: '990 ₽', serviceId: 'cardio' },
  { id: 'pool', title: 'Справка в бассейн', badge: '400 ₽', serviceId: 'spravki' },
  { id: 'cardio-50', title: 'Консультация кардиолога', badge: '−50%', serviceId: 'cardio' },
  { id: 'holter', title: 'Холтер', badge: '−15%', serviceId: 'cardio' },
  { id: 'uzi-women', title: 'Комплексное УЗИ для женщин', badge: 'скидка более 30%', serviceId: 'us' },
  { id: 'complex', title: 'Комплексное обследование: консультации, УЗИ, анализы', badge: 'программы', serviceId: 'checkup' },
  { id: 'uro-gyn', title: 'Эстетическая урогинекология', badge: 'от 14 200 ₽', text: 'Филлер «Делайт Джи», 1 мл — 14 200 ₽, 2 мл — 21 300 ₽', serviceId: 'gyn' },
  { id: 'weekend', title: 'Анализы в выходные', badge: '−10%', text: 'Скидка на все анализы по субботам и воскресеньям', serviceId: 'labs' },
];
