import { Check, ChevronDown, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Blob } from '@/components/ui/Blob';
import { DoctorAvatar } from '@/components/ui/DoctorAvatar';
import { PageHead } from '@/components/ui/PageHead';
import { Stars } from '@/components/ui/Stars';
import { T } from '@/components/ui/Text';
import { DoctorBookButton } from '@/components/widgets/DoctorBookButton';
import { doctors, getDoctor, officialDoctorUrl } from '@/content/doctors';
import { ph } from '@/content/placeholders';
import { reviewSource, reviewsFor } from '@/content/reviews';
import { getService } from '@/content/services';

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDoctor(slug);
  return { title: d ? `${d.name} — ${d.specialty}` : 'Врач' };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function List({ items, check = false }: { items: string[]; check?: boolean }) {
  return (
    <ul className={check ? 'grid gap-3 sm:grid-cols-2' : 'space-y-2'}>
      {items.map((s) =>
        check ? (
          <li key={s} className="flex items-start gap-3 rounded-[var(--radius-md)] bg-mint-soft p-4">
            <Check className="mt-1 shrink-0 text-sage" size={20} aria-hidden />
            <span><T>{s}</T></span>
          </li>
        ) : (
          <li key={s} className="flex gap-3">
            <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
            <span><T>{s}</T></span>
          </li>
        ),
      )}
    </ul>
  );
}

export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDoctor(slug);
  if (!d) notFound();
  const service = getService(d.serviceId);
  const slots = reviewsFor(d.slug);
  const index = doctors.indexOf(d);

  return (
    <>
      <PageHead eyebrow={d.specialty} title={d.name} lead={d.role ? <T>{d.role}</T> : undefined}>
        <p className="mt-3"><Link href="/doctors/" className="link-u text-sage">← Все врачи</Link></p>
      </PageHead>
      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-[320px_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative mx-auto grid h-64 w-full max-w-[320px] place-items-center sm:h-80">
              <Blob variant={(index % 3) as 0 | 1 | 2} className="absolute h-full w-full text-mint" />
              <DoctorAvatar doctor={d} index={index} size="lg" className="relative" priority />
            </div>
            {!d.photo && <p className="mt-2 text-center text-mute"><T>{ph.photo}</T></p>}
            {d.mentions && <p className="mt-4 flex items-center justify-center gap-2 text-sage-dark"><Stars size={16} /> {d.mentions}</p>}
          </div>

          <div className="space-y-10">
            <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-soft">
              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-[0.9rem] text-mute">Стаж</dt>
                  <dd><T>{d.experience}</T></dd>
                </div>
                <div>
                  <dt className="text-[0.9rem] text-mute">{service?.priceCaption ?? 'Цена'}</dt>
                  <dd className="font-heading text-2xl text-sage"><T>{service?.priceText ?? ''}</T></dd>
                </div>
              </dl>
              <div className="mt-6"><DoctorBookButton slug={d.slug} /></div>
              <p className="mt-3 text-[0.88rem] text-mute">Данные о враче — с сайта клиники на 20.10.2026.</p>
            </div>

            <Block title={d.methods ? 'С чем обращаются' : 'Чем занимается'}>
              <List items={d.interests} check />
              {d.methods && (
                <>
                  <h3 className="mb-3 mt-6 text-xl">Методы и процедуры</h3>
                  <List items={d.methods} />
                </>
              )}
              <p className="mt-3 text-[0.92rem] text-mute">Это перечень направлений работы врача, а не диагноз. Что именно нужно Вам, подскажет врач на приёме.</p>
            </Block>

            <Block title="Образование">
              <List items={d.education} />
            </Block>

            {d.courses && (
              <details className="group rounded-[var(--radius-card)] bg-white p-6 shadow-soft">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-heading text-2xl [&::-webkit-details-marker]:hidden">
                  Повышение квалификации
                  <ChevronDown className="shrink-0 text-sage transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <div className="mt-4"><List items={d.courses} /></div>
              </details>
            )}

            {d.extra?.map((sec) => (
              <Block key={sec.title} title={sec.title}>
                <List items={sec.items} />
              </Block>
            ))}

            {d.photo && (
              <p>
                <a href={officialDoctorUrl(d.slug)} target="_blank" rel="noopener noreferrer" className="link-u inline-flex items-center gap-2 text-sage">
                  Сертификаты и дипломы — на сайте клиники <ExternalLink size={16} aria-hidden />
                </a>
              </p>
            )}

            <Block title="Что пишут пациенты">
              <div className="space-y-4">
                {(slots.length ? slots : [{ id: 'x', text: d.quote, author: '', date: '' }]).map((r) => (
                  <figure key={r.id} className="rounded-[var(--radius-card)] bg-white p-6 shadow-soft">
                    <Stars size={18} />
                    <blockquote className="mt-3 font-heading text-xl"><T>{slots.length ? `«${r.text}»` : r.text}</T></blockquote>
                    <figcaption className="mt-3 text-mute">{reviewSource}{r.author ? ` · ${r.author}${r.date ? `, ${r.date}` : ''}` : ''}</figcaption>
                  </figure>
                ))}
              </div>
            </Block>
          </div>
        </div>
      </section>
    </>
  );
}
