import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHead } from '@/components/ui/PageHead';
import { ServiceIcon } from '@/components/ui/Icons';
import { Reveal } from '@/components/motion/Reveal';
import { T } from '@/components/ui/Text';
import { PricesSection } from '@/components/sections/PricesSection';
import { ServiceBookButton } from '@/components/widgets/ServiceBookButton';
import { services } from '@/content/services';

export const metadata: Metadata = { title: 'Направления и цены — Правильное лечение' };

export default function ServicesPage() {
  return (
    <>
      <PageHead eyebrow="Направления" title="Направления и цены" lead="К кому записаться и сколько это стоит. Всё, что ещё уточняем, помечено пунктиром." />
      <section className="section-y">
        <div className="container-x">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal as="li" key={s.id} delay={(i % 3) * 0.07} className="flex flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-mint text-sage"><ServiceIcon name={s.icon} size={32} /></span>
                <h2 className="mt-4 text-xl"><Link href={`/services/${s.id}/`} className="link-u">{s.title}</Link></h2>
                <p className="mt-1 text-mute"><T>{s.lead}</T></p>
                <p className="mt-4 font-heading text-lg text-sage"><T>{s.priceText}</T></p>
                <div className="mt-auto pt-5"><ServiceBookButton id={s.id} /></div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <PricesSection />
    </>
  );
}
