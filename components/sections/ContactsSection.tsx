import { SectionHead } from '../ui/SectionHead';
import { ContactsBlock } from './ContactsBlock';

export function ContactsSection() {
  return (
    <section id="contacts" aria-labelledby="contacts-heading" className="section-y scroll-mt-20">
      <div className="container-x">
        <SectionHead id="contacts-heading" eyebrow="Контакты" title="Приходите к нам" lead="Демо-адрес, телефон и режим работы — ниже." />
        <ContactsBlock level={3} />
      </div>
    </section>
  );
}
