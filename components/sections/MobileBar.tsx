'use client';

import { CalendarCheck, Phone, Send } from 'lucide-react';
import { site } from '@/content/site';
import { useBooking } from '../widgets/BookingProvider';

/** Нижняя панель на мобильном: «Позвонить» · «Записаться». */
export function MobileBar() {
  const { openBooking } = useBooking();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2.5 sm:hidden">
      <div className="grid grid-cols-[1fr_auto_1fr] gap-2">
        <a href={site.phones[0].href} className="flex min-h-14 items-center justify-center gap-2 rounded-full border-2 border-sage/30 bg-white font-heading font-medium text-sage">
          <Phone size={20} /> Позвонить
        </a>
        <a href={site.messenger.chatUrl} target="_blank" rel="noopener noreferrer" aria-label="Написать в Telegram" className="grid min-h-14 w-14 place-items-center rounded-full border-2 border-sage/30 bg-white text-sage">
          <Send size={20} aria-hidden />
        </a>
        <button onClick={() => openBooking()} className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-sage font-heading font-medium text-white shadow-soft">
          <CalendarCheck size={20} /> Записаться
        </button>
      </div>
    </div>
  );
}
