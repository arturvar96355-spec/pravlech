import { SectionHead } from '../ui/SectionHead';
import { ContactsBlock } from './ContactsBlock';

export function ContactsSection() {
  return (
    <section id="contacts" aria-labelledby="contacts-heading" className="section-y scroll-mt-20">
      <div className="container-x">
        <SectionHead id="contacts-heading" eyebrow="Контакты" title="Приходите в Перово" lead="Перовская улица, 66к3. Телефон и режим — ниже." />
        <ContactsBlock withHeading={false} />
      </div>
    </section>
  );
}
