import type { Metadata } from 'next';
import { MemoSheet } from '@/components/widgets/MemoSheet';
import { PageHead } from '@/components/ui/PageHead';

export const metadata: Metadata = { title: 'Памятка пациента — Правильное лечение' };

export default function MemoPage() {
  return (
    <>
      <div className="print:hidden">
        <PageHead
          eyebrow="Памятка"
          title="Памятка пациента"
          lead="Возьмите её на приём. Перед приёмом отметьте вопросы, после приёма впишите ответы врача своими словами. Можно распечатать или сохранить в PDF."
        />
      </div>
      <section className="section-y print:py-0">
        <div className="container-x">
          <MemoSheet />
        </div>
      </section>
    </>
  );
}
