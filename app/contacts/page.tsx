import type { Metadata } from 'next';
import { ContactsBlock } from '@/components/sections/ContactsBlock';
import { PageHead } from '@/components/ui/PageHead';

export const metadata: Metadata = { title: 'Контакты — Ясный приём' };

export default function ContactsPage() {
  return (
    <>
      <PageHead eyebrow="Контакты" title="Как нас найти" lead="Демо-адрес: Город N, ул. Примерная, 1. Клиника вымышлена." />
      <section className="section-y"><div className="container-x"><ContactsBlock /></div></section>
    </>
  );
}
