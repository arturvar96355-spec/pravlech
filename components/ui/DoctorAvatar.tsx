import Image from 'next/image';
import type { Doctor } from '@/content/doctors';
import { asset, cn } from '@/lib/utils';
import { Monogram } from './Monogram';

const sizes = { sm: 'h-14 w-14', md: 'h-28 w-28', lg: 'h-44 w-44 sm:h-60 sm:w-60' } as const;

/** Фото врача в мягкой органической форме. Без фото — монограмма. */
export function DoctorAvatar({
  doctor,
  index = 0,
  size = 'md',
  className,
  priority = false,
}: {
  doctor: Doctor;
  index?: number;
  size?: keyof typeof sizes;
  className?: string;
  priority?: boolean;
}) {
  if (!doctor.photo) return <Monogram initials={doctor.initials} index={index} size={size === 'lg' ? 'lg' : size} className={className} />;
  return (
    <span
      className={cn('relative block shrink-0 overflow-hidden rounded-[38%_62%_55%_45%/50%_45%_55%_50%] bg-mint', sizes[size], className)}
    >
      <Image
        src={asset(doctor.photo.src)}
        width={doctor.photo.width}
        height={doctor.photo.height}
        alt={`${doctor.name}, ${doctor.specialty}`}
        priority={priority}
        unoptimized
        className="h-full w-full object-cover object-top"
      />
    </span>
  );
}
