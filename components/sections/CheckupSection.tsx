import { CheckupBuilder } from '../widgets/CheckupBuilder';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../motion/Reveal';

export function CheckupSection() {
  return (
    <section id="checkup" aria-labelledby="checkup-title" className="section-y">
      <div className="container-x">
        <SectionHead id="checkup-title" eyebrow="Чек-ап" title="Соберите свой *чек-ап*" lead="Отметьте, что хотите проверить. Сумму покажем сразу." />
        <Reveal><CheckupBuilder compact /></Reveal>
      </div>
    </section>
  );
}
