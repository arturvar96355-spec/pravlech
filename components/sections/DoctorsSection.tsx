import { WaveTop } from '../ui/Wave';
import { DoctorsGrid } from '../widgets/DoctorsGrid';
import { FEATURED, FeaturedDoctors } from '../widgets/FeaturedDoctors';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../motion/Reveal';

export function DoctorsSection() {
  return (
    <section id="doctors" aria-labelledby="doctors-title" className="section-y relative bg-white/60 pt-24 lg:pt-32">
      <WaveTop />
      <div className="container-x">
        <SectionHead id="doctors-title" eyebrow="Врачи" title="Кого чаще всего называют в *отзывах*" lead="Пациенты хвалят врачей по именам. Выберите специалиста и запишитесь за три клика." />
        <FeaturedDoctors />
        <h3 className="mb-5 text-2xl">Все врачи клиники</h3>
        <Reveal><DoctorsGrid limit={10} exclude={FEATURED} /></Reveal>
      </div>
    </section>
  );
}
