import type { Metadata } from 'next';
import { DoctorsGrid } from '@/components/widgets/DoctorsGrid';
import { PageHead } from '@/components/ui/PageHead';

export const metadata: Metadata = { title: 'Врачи — Правильное лечение' };

export default function DoctorsPage() {
  return (
    <>
      <PageHead eyebrow="Врачи" title="Врачи, которые объясняют" lead="Сначала — специалисты, которых чаще всего называют в отзывах. Остальных врачей центра добавим по списку клиники." />
      <section className="section-y">
        <div className="container-x"><DoctorsGrid /></div>
      </section>
    </>
  );
}
