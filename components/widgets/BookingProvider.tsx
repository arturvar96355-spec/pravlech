'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { targetForDoctor, targetForService } from '@/content/booking';
import type { BookingTarget } from '@/lib/booking';

export type OpenBookingOptions = {
  /** slug врача */
  doctor?: string;
  /** id услуги или 'checkup' */
  service?: string;
  /** Состав чек-апа — уходит в заявку */
  checkup?: string[];
};

type Ctx = { openBooking: (opts?: OpenBookingOptions) => void };
const BookingCtx = createContext<Ctx>({ openBooking: () => {} });
export const useBooking = () => useContext(BookingCtx);

const Drawer = dynamic(() => import('./BookingDrawer').then((m) => m.BookingDrawer), { ssr: false });

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; key: number; target: BookingTarget | null; checkup?: string[] }>({
    open: false,
    key: 0,
    target: null,
  });

  const openBooking = useCallback((opts: OpenBookingOptions = {}) => {
    const target = opts.doctor ? targetForDoctor(opts.doctor) : opts.service ? targetForService(opts.service) : undefined;
    setState((s) => ({ open: true, key: s.key + 1, target: target ?? null, checkup: opts.checkup }));
  }, []);

  const value = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <BookingCtx.Provider value={value}>
      {children}
      {state.key > 0 && (
        <Drawer
          key={state.key}
          open={state.open}
          initialTarget={state.target}
          checkup={state.checkup}
          onClose={() => setState((s) => ({ ...s, open: false }))}
        />
      )}
    </BookingCtx.Provider>
  );
}
