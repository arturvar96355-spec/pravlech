import { Triage } from '../widgets/Triage';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../motion/Reveal';

export function TriageSection() {
  return (
    <section id="triage" aria-labelledby="triage-title" className="section-y scroll-mt-20">
      <div className="container-x">
        <SectionHead id="triage-title" eyebrow="Подбор врача" title="С чем Вы пришли?" lead="Выберите, что Вас беспокоит. Подскажем, к какому специалисту записаться." />
        <Reveal><Triage /></Reveal>
      </div>
    </section>
  );
}
