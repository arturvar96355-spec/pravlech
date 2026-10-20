'use client';

import Link from 'next/link';
import { type Doctor } from '@/content/doctors';
import { ph } from '@/content/placeholders';
import { getService } from '@/content/services';
import { Blob } from '../ui/Blob';
import { Button } from '../ui/Button';
import { DoctorAvatar } from '../ui/DoctorAvatar';
import { T } from '../ui/Text';
import { Stars } from '../ui/Stars';
import { useBooking } from './BookingProvider';

export function DoctorCard({ doctor, index = 0 }: { doctor: Doctor; index?: number }) {
  const { openBooking } = useBooking();
  const service = getService(doctor.serviceId);
  const priceLine = `${service?.priceCaption ?? 'Цена'}: ${service?.priceText ?? ''}`;

  return (
    <article className="group relative flex h-full flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-soft transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-lift focus-within:-translate-y-1 focus-within:shadow-lift">
      <div className="relative mb-5 grid h-32 place-items-center">
        <Blob variant={(index % 3) as 0 | 1 | 2} className="absolute h-full w-auto text-mint-soft" />
        <DoctorAvatar doctor={doctor} index={index} size="md" className="relative" />
      </div>
      {!doctor.photo && <p className="mb-1 text-center text-[0.8rem] text-mute"><T>{ph.photo}</T></p>}

      <h3 className="mt-2 text-center text-[1.2rem]">
        <Link href={`/doctors/${doctor.slug}/`} className="link-u after:absolute after:inset-0 after:content-['']">
          <T>{doctor.name}</T>
        </Link>
      </h3>
      <p className="mt-1 text-center text-[0.98rem] text-mute"><T>{doctor.specialty}</T></p>
      {doctor.mentions && (
        <p className="mt-2 flex items-center justify-center gap-2 text-[0.9rem] text-sage-dark">
          <Stars size={14} /> {doctor.mentions}
        </p>
      )}

      <div className="mt-5 grid flex-1 content-start">
        <p className="col-start-1 row-start-1 text-center text-[0.98rem] transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-0 [@media(hover:hover)]:group-focus-within:opacity-0">
          <T>{priceLine}</T>
        </p>
        <blockquote className="col-start-1 row-start-1 text-center text-[0.95rem] italic text-ink opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100">
          <T>{doctor.quote}</T>
        </blockquote>
      </div>

      <div className="relative z-10 mt-4 [@media(hover:hover)]:translate-y-1 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:transition-[opacity,transform] [@media(hover:hover)]:duration-300 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:translate-y-0 [@media(hover:hover)]:group-focus-within:opacity-100">
        <Button className="w-full" onClick={() => openBooking({ doctor: doctor.slug })}>
          Записаться
        </Button>
      </div>
    </article>
  );
}
