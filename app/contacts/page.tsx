import type { Metadata } from 'next';
import { ContactsBlock } from '@/components/sections/ContactsBlock';
import { PageHead } from '@/components/ui/PageHead';

export const metadata: Metadata = { title: 'Контакты — Правильное лечение' };

export default function ContactsPage() {
  return (
    <>
      <PageHead eyebrow="Контакты" title="Как нас найти" lead="Москва, Перовская улица, 66к3. Мы в Перово." />
      <section className="section-y"><div className="container-x"><ContactsBlock withHeading={false} /></div></section>
    </>
  );
}
