import { DoctorsGrid } from '../widgets/DoctorsGrid';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../motion/Reveal';

export function DoctorsSection() {
  return (
    <section id="doctors" aria-labelledby="doctors-title" className="section-y bg-white/60">
      <div className="container-x">
        <SectionHead id="doctors-title" eyebrow="Врачи" title="Кого чаще всего называют в отзывах" lead="Пациенты хвалят врачей по именам. Выберите специалиста и запишитесь за три клика." />
        <Reveal><DoctorsGrid limit={10} /></Reveal>
      </div>
    </section>
  );
}
