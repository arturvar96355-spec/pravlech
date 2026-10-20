'use client';

import { Button } from '../ui/Button';
import { useBooking } from './BookingProvider';

export function ServiceBookButton({ id, variant = 'secondary', large = false }: { id: string; variant?: 'primary' | 'secondary'; large?: boolean }) {
  const { openBooking } = useBooking();
  return (
    <Button variant={variant} size={large ? 'lg' : 'md'} onClick={() => openBooking({ service: id })}>
      Записаться
    </Button>
  );
}
