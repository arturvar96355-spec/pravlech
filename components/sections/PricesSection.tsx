import { topItems } from '@/content/prices';
import { site } from '@/content/site';
import { Badge } from '../ui/Badge';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../motion/Reveal';
import { PriceSearch } from '../widgets/PriceSearch';
import { priceLabel } from '@/lib/price';
import { T } from '../ui/Text';

export function PricesSection() {
  const top = topItems();
  return (
    <section id="prices" aria-labelledby="prices-title" className="section-y bg-white/60 scroll-mt-20">
      <div className="container-x">
        <SectionHead id="prices-title" eyebrow="Цены" title="Сколько стоит" lead="Ищите по прайсу клиники или посмотрите основные позиции.">
          <Badge tone="peach" className="mt-5">По выходным −{site.weekendDiscount}% на анализы</Badge>
        </SectionHead>
        <ul className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {top.map((i, k) => (
            <Reveal as="li" key={i.id} delay={k * 0.07} className="rounded-[var(--radius-card)] bg-cream p-6 shadow-soft">
              <p className="text-[0.85rem] uppercase tracking-wide text-mute">{i.group}</p>
              <p className="text-[1.02rem]"><T>{i.title}</T></p>
              <p className="mt-2 font-heading text-3xl font-semibold text-sage"><T>{priceLabel(i)}</T></p>
              {i.note && <p className="mt-1 text-[0.92rem] text-mute">{i.note}</p>}
            </Reveal>
          ))}
        </ul>
        <PriceSearch />
      </div>
    </section>
  );
}
