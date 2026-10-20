import type { Metadata, Viewport } from 'next';
import { Onest, Rubik } from 'next/font/google';
import { JsonLd } from '@/components/seo/JsonLd';
import { LenisProvider } from '@/components/motion/LenisProvider';
import { Footer } from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';
import { MobileBar } from '@/components/sections/MobileBar';
import { BookingProvider } from '@/components/widgets/BookingProvider';
import { site } from '@/content/site';
import './globals.css';

const rubik = Rubik({ subsets: ['latin', 'cyrillic'], weight: ['500', '600'], display: 'swap', variable: '--font-rubik' });
const onest = Onest({ subsets: ['latin', 'cyrillic'], weight: ['400', '500'], display: 'swap', variable: '--font-onest' });

const description = 'Многопрофильный медицинский центр в Перово. Кардиолог, невролог, ЛОР, УЗИ, анализы. Без лишних анализов и очередей. Запись онлайн.';

export const metadata: Metadata = {
  metadataBase: new URL('https://pravlech.example'),
  title: `${site.name} — медицинский центр в Перово`,
  description,
  robots: { index: false, follow: false },
  openGraph: {
    title: `${site.name} — врачи, которые объясняют`,
    description,
    locale: 'ru_RU',
    type: 'website',
    images: [{ url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/og.jpg`, width: 1200, height: 630, alt: site.name }],
  },
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/favicon.svg` },
};

export const viewport: Viewport = { themeColor: '#FBF8F3', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${rubik.variable} ${onest.variable}`} data-fs="0" data-contrast="normal" suppressHydrationWarning>
      <head>
        <meta name="robots" content="noindex, nofollow" />
        {/* Применяем сохранённые настройки доступности до первой отрисовки */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var p=JSON.parse(localStorage.getItem('pravlech-a11y')||'{}'),r=document.documentElement;r.dataset.fs=String(p.fs===1||p.fs===2?p.fs:0);r.dataset.contrast=p.hc?'high':'normal'}catch(e){}",
          }}
        />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-sage focus:px-5 focus:py-3 focus:text-white">
          К содержанию
        </a>
        <JsonLd />
        <LenisProvider>
          <BookingProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <MobileBar />
          </BookingProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
