'use client';

import { Button } from '../ui/Button';
import { useBooking } from './BookingProvider';

export function ServiceBookButton({ id }: { id: string }) {
  const { openBooking } = useBooking();
  return <Button variant="secondary" onClick={() => openBooking({ service: id })}>Записаться</Button>;
}
