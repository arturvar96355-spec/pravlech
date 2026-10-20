'use client';

import Link from 'next/link';
import { doctors } from '@/content/doctors';
import { mentionStats } from '@/content/reviewStats';
import { quoteFor, reviewSource } from '@/content/reviews';
import { getService } from '@/content/services';
import { Blob } from '../ui/Blob';
import { Button } from '../ui/Button';
import { DoctorAvatar } from '../ui/DoctorAvatar';
import { T } from '../ui/Text';
import { Reveal } from '../motion/Reveal';
import { useBooking } from './BookingProvider';

export const FEATURED = ['vardanyan-argishti-gagikovich', 'salkaev-marat-ravilovich', 'ermoshkina-natalya-yurevna'] as const;

/** Три врача, которых чаще всего называют в отзывах: крупное фото и слова пациента рядом. */
export function FeaturedDoctors() {
  const { openBooking } = useBooking();
  return (
    <ul className="mb-14 space-y-6">
      {FEATURED.map((slug, i) => {
        const d = doctors.find((x) => x.slug === slug)!;
        const q = quoteFor(slug);
        const n = mentionStats.find((m) => m.slug === slug)?.value;
        const service = getService(d.serviceId);
        const flip = i % 2 === 1;
        return (
          <Reveal as="li" key={slug} className={`relative grid items-center gap-6 rounded-[var(--radius-lg)] bg-white p-6 shadow-soft sm:p-8 md:gap-10 ${flip ? 'md:grid-cols-[1fr_260px] md:[&>*:first-child]:order-2' : 'md:grid-cols-[260px_1fr]'}`}>
            <div className="relative mx-auto grid h-60 w-60 place-items-center">
              <Blob variant={(i % 3) as 0 | 1 | 2} className="absolute h-full w-full text-mint" />
              <DoctorAvatar doctor={d} index={i} size="lg" className="relative !h-48 !w-48" />
            </div>
            <div>
              {n != null && <p className="font-heading text-5xl font-semibold leading-none text-sage">{n}<span className="ml-2 text-base font-normal text-mute">из 150 просмотренных отзывов называют</span></p>}
              <h3 className="mt-3 text-[1.6rem]">
                <Link href={`/doctors/${slug}/`} className="link-u"><T>{d.name}</T></Link>
              </h3>
              <p className="text-mute"><T>{d.specialty}</T> · стаж <T>{d.experience}</T></p>
              {q && (
                <figure className="relative mt-4 rounded-[var(--radius-md)] rounded-tl-none bg-mint-soft p-4">
                  <blockquote className="font-heading text-[1.1rem] leading-snug"><T>{`«${q.text}»`}</T></blockquote>
                  <figcaption className="mt-1 text-[0.88rem] text-mute">{reviewSource} · {q.author}{q.date ? `, ${q.date}` : ''}</figcaption>
                </figure>
              )}
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                <Button onClick={() => openBooking({ doctor: slug })}>Записаться</Button>
                <span className="text-[0.98rem]">{service?.priceCaption}: <b className="font-heading font-medium text-sage"><T>{service?.priceText ?? ''}</T></b></span>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
