import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { nav, site } from '@/content/site';
import { Logo } from '../ui/Logo';
import { T } from '../ui/Text';

export function Footer() {
  return (
    <footer className="bg-sage-dark text-white">
      <div className="container-x pb-28 pt-14 sm:pb-12">
        <div className="rounded-[var(--radius-card)] bg-white p-5 text-ink sm:p-7" role="note">
          <p className="flex items-start gap-3 font-heading text-xl font-semibold leading-snug sm:text-2xl">
            <ShieldAlert className="mt-0.5 shrink-0 text-[#a3361d]" size={28} aria-hidden />
            <span><T>{site.warning}</T></span>
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo inverted />
            <p className="mt-4 max-w-sm text-white/85">
              {site.address.zip}, {site.address.street}
              <br />
              {site.address.district}
            </p>
          </div>
          <nav aria-label="Футер" className="flex flex-col gap-1">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="link-u w-fit py-1.5">{n.label}</Link>
            ))}
            <Link href="/privacy/" className="link-u w-fit py-1.5">Политика обработки данных</Link>
          </nav>
          <div className="flex flex-col gap-1">
            {site.phones.map((p) => (
              <a key={p.href} href={p.href} className="link-u w-fit py-1.5 font-heading text-lg font-medium">{p.display}</a>
            ))}
            <a href={`mailto:${site.email}`} className="link-u w-fit py-1.5">{site.email}</a>
            <a href={site.messenger.chatUrl} target="_blank" rel="noopener noreferrer" className="link-u w-fit py-1.5">Telegram</a>
            <a href={site.social.vk} target="_blank" rel="noopener noreferrer" className="link-u w-fit py-1.5">ВКонтакте</a>
          </div>
        </div>

        <div className="mt-10 space-y-2 border-t border-white/20 pt-6 text-[0.95rem] text-white/85">
          <p><T onDark>{`Лицензия на медицинскую деятельность: ${site.license}`}</T></p>
          <p>{site.legalEntity}</p>
          <p><T onDark>{site.logoNote}</T></p>
          <p className="pt-3 text-sm text-white/70">{site.conceptNote}</p>
        </div>
      </div>
    </footer>
  );
}
