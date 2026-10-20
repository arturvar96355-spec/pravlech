'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Menu, Phone, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { nav, site } from '@/content/site';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { Magnetic } from '../motion/Magnetic';
import { OpenNow } from '../widgets/OpenNow';
import { useBooking } from '../widgets/BookingProvider';

export function Header() {
  const [menu, setMenu] = useState(false);
  const { openBooking } = useBooking();

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-cream/95">
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <div className="min-w-0 sm:shrink-0"><Logo /></div>

        <nav aria-label="Основное меню" className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="link-u whitespace-nowrap py-2 text-[1.02rem] font-medium">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden flex-col items-end leading-tight xl:flex">
            {site.phones.map((p) => (
              <a key={p.href} href={p.href} className="link-u whitespace-nowrap font-heading text-[0.98rem] font-medium">
                {p.display}
              </a>
            ))}
          </div>
          <span className="hidden xl:block"><OpenNow className="text-sage-dark" /></span>
          <Magnetic className="hidden sm:block">
            <Button onClick={() => openBooking()}>Записаться</Button>
          </Magnetic>
          <a href={site.phones[0].href} aria-label={`Позвонить: ${site.phones[0].display}`} className="grid h-12 w-12 place-items-center rounded-full bg-mint text-sage sm:hidden">
            <Phone size={22} />
          </a>
          <button
            onClick={() => setMenu((v) => !v)}
            aria-label={menu ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            className="grid h-12 w-12 place-items-center rounded-full hover:bg-mint lg:hidden"
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.nav
            id="mobile-menu"
            aria-label="Мобильное меню"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="border-t border-line bg-cream lg:hidden"
          >
            <ul className="container-x py-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} onClick={() => setMenu(false)} className="flex min-h-14 items-center border-b border-line/60 font-heading text-lg font-medium">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li className="py-4">
                <OpenNow className="text-sage-dark" />
                <div className="mt-2 flex flex-col">
                  {site.phones.map((p) => (
                    <a key={p.href} href={p.href} className="py-1 font-heading font-medium">
                      {p.display}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
