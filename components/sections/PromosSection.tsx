import { promos, promoTerm } from '@/content/promos';
import { Reveal } from '../motion/Reveal';
import { SectionHead } from '../ui/SectionHead';
import { T } from '../ui/Text';
import { PromoBookButton } from '../widgets/PromoBookButton';

export function PromosSection() {
  return (
    <section id="promos" aria-labelledby="promos-title" className="section-y scroll-mt-20">
      <div className="container-x">
        <SectionHead
          id="promos-title"
          eyebrow="Акции"
          title="Акции клиники"
          lead={<>Условия и сроки уточняйте у администратора. <T>{promoTerm}</T></>}
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {promos.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 4) * 0.07} className="flex flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift">
              <span className="w-fit rounded-full bg-peach px-4 py-1.5 font-heading text-[1.05rem] font-semibold text-peach-deep">{p.badge}</span>
              <h3 className="mt-4 text-xl"><T>{p.title}</T></h3>
              {p.text && <p className="mt-2 text-[0.98rem] text-mute"><T>{p.text}</T></p>}
              <div className="mt-auto pt-5"><PromoBookButton serviceId={p.serviceId} /></div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
