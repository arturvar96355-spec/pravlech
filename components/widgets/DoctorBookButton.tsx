'use client';

import { Button } from '../ui/Button';
import { useBooking } from './BookingProvider';

export function DoctorBookButton({ slug, disabled }: { slug: string; disabled?: boolean }) {
  const { openBooking } = useBooking();
  return (
    <Button size="lg" disabled={disabled} onClick={() => openBooking({ doctor: slug })}>
      Записаться к врачу
    </Button>
  );
}
