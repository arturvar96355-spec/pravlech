import type { Metadata } from 'next';
import { PageHead } from '@/components/ui/PageHead';
import { CheckupBuilder } from '@/components/widgets/CheckupBuilder';

export const metadata: Metadata = { title: 'Конструктор чек-апа — Правильное лечение' };

export default function CheckupPage() {
  return (
    <>
      <PageHead eyebrow="Чек-ап" title="Соберите свой чек-ап" lead="Отметьте, что хотите проверить. Сумму посчитаем сразу, а окончательный план составит терапевт." />
      <section className="section-y"><div className="container-x"><CheckupBuilder /></div></section>
    </>
  );
}
