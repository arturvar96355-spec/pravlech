import { ArrowLeft, Backpack } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Reveal } from '@/components/motion/Reveal';
import { DoctorAvatar } from '@/components/ui/DoctorAvatar';
import { ServiceIcon } from '@/components/ui/Icons';
import { PageHead } from '@/components/ui/PageHead';
import { T } from '@/components/ui/Text';
import { PriceList } from '@/components/widgets/PriceList';
import { ServiceBookButton } from '@/components/widgets/ServiceBookButton';
import { doctors } from '@/content/doctors';
import { processSteps } from '@/content/process';
import { bringChild, bringList, bringNote } from '@/content/preparation';
import { getPriceGroup } from '@/content/prices';
import { promos } from '@/content/promos';
import { getService, priceGroupByService, services } from '@/content/services';
import { site } from '@/content/site';
import { typograph } from '@/lib/typograph';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  return { title: s ? `${s.title} — Правильное лечение` : 'Направление' };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const group = getPriceGroup(priceGroupByService[service.id]);
  const people = doctors.filter((d) => d.serviceId === service.id || (service.specialtyId && d.specialtyId === service.specialtyId));
  const related = promos.filter((p) => p.serviceId === service.id);
  const noDoctors = people.length === 0;

  return (
    <>
      <PageHead eyebrow="Направление" title={service.title} lead={typograph(service.lead)}>
        <p className="mt-3"><Link href="/services/" className="link-u inline-flex items-center gap-1 text-sage"><ArrowLeft size={16} aria-hidden /> Все направления</Link></p>
      </PageHead>

      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_340px]">
          <div className="space-y-12">
            <div className="flex flex-wrap items-center gap-6 rounded-[var(--radius-card)] bg-white p-6 shadow-soft">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-mint text-sage"><ServiceIcon name={service.icon} size={32} /></span>
              <div className="min-w-[10rem]">
                <p className="text-[0.9rem] text-mute">{service.priceCaption}</p>
                <p className="font-heading text-3xl text-sage"><T>{service.priceText}</T></p>
              </div>
              <ServiceBookButton id={service.id} variant="primary" large />
            </div>

            <section aria-labelledby="doctors-h">
              <h2 id="doctors-h" className="mb-5 text-2xl">Кто принимает</h2>
              {noDoctors ? (
                <p className="rounded-[var(--radius-card)] bg-white p-6 text-mute shadow-soft">
                  На сайте клиники врач этого направления не указан. Записаться можно по телефону, администратор подберёт специалиста. <T>[врач направления — уточнить]</T>
                </p>
              ) : (
                <ul className="grid gap-4 sm:grid-cols-2">
                  {people.map((d) => (
                    <li key={d.slug}>
                      <Link href={`/doctors/${d.slug}/`} className="group flex items-center gap-4 rounded-[var(--radius-card)] bg-white p-4 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift">
                        <DoctorAvatar doctor={d} size="sm" />
                        <span>
                          <span className="link-u block font-heading font-medium"><T>{d.name}</T></span>
                          <span className="block text-[0.95rem] text-mute"><T>{d.specialty}</T></span>
                          <span className="block text-[0.9rem] text-sage-dark">Стаж: <T>{d.experience}</T></span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {group && (
              <section id="prices" aria-labelledby="price-h" className="scroll-mt-24">
                <h2 id="price-h" className="mb-5 text-2xl">Цены</h2>
                <PriceList group={group} />
              </section>
            )}

            {related.length > 0 && (
              <section aria-labelledby="promo-h">
                <h2 id="promo-h" className="mb-5 text-2xl">Акции по направлению</h2>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {related.map((p) => (
                    <li key={p.id} className="rounded-[var(--radius-card)] bg-white p-5 shadow-soft">
                      <span className="rounded-full bg-peach px-3 py-1 font-heading text-[0.95rem] font-semibold text-peach-deep">{p.badge}</span>
                      <p className="mt-3 font-heading text-lg"><T>{p.title}</T></p>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[0.9rem] text-mute"><T>[срок действия — уточнить]</T></p>
              </section>
            )}

            <section aria-labelledby="faq-h">
              <h2 id="faq-h" className="mb-3 text-2xl">Вопросы и ответы</h2>
              <p className="text-mute"><T>[вопросы и ответы — от клиники]</T></p>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Reveal className="rounded-[var(--radius-card)] bg-mint-soft p-6">
              <h2 className="flex items-center gap-2 text-xl"><Backpack size={22} className="text-sage" aria-hidden /> Что взять с собой</h2>
              <ul className="mt-3 space-y-2">
                {bringList.map((b) => <li key={b} className="flex gap-2"><span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />{b}</li>)}
              </ul>
              <p className="mt-3 text-[0.92rem] text-mute">{bringChild}</p>
              <p className="mt-2 text-[0.9rem]"><T>{bringNote}</T></p>
              <p className="mt-3 text-[0.92rem] text-mute">Как готовиться к исследованию, скажет врач или администратор при записи.</p>
            </Reveal>

            <Reveal className="rounded-[var(--radius-card)] bg-white p-6 shadow-soft">
              <h2 className="text-xl">Как проходит приём</h2>
              <ol className="mt-3 space-y-3">
                {processSteps.map((s) => (
                  <li key={s.n} className="flex gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sage font-heading text-sm text-white">{s.n}</span>
                    <span className="text-[0.98rem]">{typograph(s.title)}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-soft">
              <p className="text-[0.95rem] text-mute">Нужна помощь с выбором?</p>
              {site.phones.map((p) => <a key={p.href} href={p.href} className="block min-h-11 py-2 font-heading text-lg font-medium text-sage">{p.display}</a>)}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
