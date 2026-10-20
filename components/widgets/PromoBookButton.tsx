'use client';

import { Button } from '../ui/Button';
import { useBooking } from './BookingProvider';

export function PromoBookButton({ serviceId }: { serviceId: string }) {
  const { openBooking } = useBooking();
  return <Button variant="secondary" onClick={() => openBooking({ service: serviceId })}>Записаться</Button>;
}
