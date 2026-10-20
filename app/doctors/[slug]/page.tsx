import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DoctorBookButton } from '@/components/widgets/DoctorBookButton';
import { Blob } from '@/components/ui/Blob';
import { Monogram } from '@/components/ui/Monogram';
import { PageHead } from '@/components/ui/PageHead';
import { Stars } from '@/components/ui/Stars';
import { T } from '@/components/ui/Text';
import { ph } from '@/content/placeholders';
import { doctors, getDoctor, scopeBySpecialty } from '@/content/doctors';
import { reviews } from '@/content/reviews';
import { getService } from '@/content/services';
import { Check } from 'lucide-react';

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDoctor(slug);
  return { title: d ? `${d.name} — ${d.specialty}` : 'Врач' };
}

export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDoctor(slug);
  if (!d) notFound();
  const service = getService(d.serviceId);
  const slots = reviews.filter((r) => r.doctorSlug === d.slug);
  const scope = scopeBySpecialty[d.specialtyId];
  const index = doctors.indexOf(d);

  return (
    <>
      <PageHead eyebrow={d.specialty} title={d.name}>
        <p className="mt-3"><Link href="/doctors/" className="link-u text-sage">← Все врачи</Link></p>
      </PageHead>
      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-[360px_1fr]">
          <div>
            <div className="relative grid h-72 place-items-center">
              <Blob variant={(index % 3) as 0 | 1 | 2} className="absolute h-full w-full text-mint" />
              <Monogram initials={d.initials} index={index} size="lg" className="relative" />
            </div>
            <p className="mt-2 text-center text-mute"><T>{ph.photo}</T></p>
            {d.mentions && <p className="mt-4 flex items-center justify-center gap-2 text-sage-dark"><Stars size={16} /> {d.mentions}</p>}
          </div>

          <div className="space-y-8">
            <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-soft">
              <dl className="grid gap-4 sm:grid-cols-2">
                <div><dt className="text-[0.9rem] text-mute">Стаж</dt><dd><T>{d.experience}</T></dd></div>
                <div><dt className="text-[0.9rem] text-mute">Образование</dt><dd><T>{d.education}</T></dd></div>
                <div><dt className="text-[0.9rem] text-mute">{d.specialtyId === 'procedure' ? 'Забор крови' : 'Приём'}</dt><dd className="font-heading text-2xl text-sage"><T>{service?.priceText ?? ''}</T></dd></div>
              </dl>
              <div className="mt-6">
                <DoctorBookButton slug={d.slug} disabled={!d.named} />
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-2xl">С чем обращаются</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {scope.map((s) => (
                  <li key={s} className="flex items-start gap-3 rounded-[var(--radius-md)] bg-mint-soft p-4"><Check className="mt-1 shrink-0 text-sage" size={20} aria-hidden /><span><T>{s}</T></span></li>
                ))}
              </ul>
              <p className="mt-3 text-[0.92rem] text-mute"><T>{ph.scopeNote}</T> Это общий перечень по специальности, а не диагноз.</p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl">Что пишут пациенты</h2>
              {(slots.length ? slots : [{ id: 'x', text: d.quote, author: 'Отзыв на Яндекс Картах' }]).map((r) => (
                <figure key={r.id} className="rounded-[var(--radius-card)] bg-white p-6 shadow-soft">
                  <Stars size={18} />
                  <blockquote className="mt-3 font-heading text-xl"><T>{r.text}</T></blockquote>
                  <figcaption className="mt-3 text-mute">{r.author}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
