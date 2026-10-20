import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { site } from '@/content/site';
import { ButtonLink } from '../ui/Button';
import { MapScheme } from '../ui/MapScheme';
import { T } from '../ui/Text';
import { HoursTable } from '../widgets/HoursTable';
import { OpenNow } from '../widgets/OpenNow';
import { RouteFinder } from '../widgets/RouteFinder';
import { Reveal } from '../motion/Reveal';

export function ContactsBlock({ level = 2 }: { level?: 2 | 3 }) {
  const Sub = level === 2 ? 'h2' : 'h3';
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-2">
      <Reveal className="space-y-6">
        <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-soft">
          <p className="flex items-start gap-3 text-lg">
            <MapPin className="mt-1 shrink-0 text-sage" aria-hidden />
            <span>{site.address.zip}, {site.address.street}<br /><span className="text-mute">{site.address.district}</span></span>
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={site.address.mapsUrl}>Открыть в Яндекс Картах</ButtonLink>
            <ButtonLink variant="secondary" href={site.messenger.chatUrl}><MessageCircle size={20} /> Написать в Telegram</ButtonLink>
          </div>
          <div className="mt-6 space-y-1">
            {site.phones.map((p) => (
              <a key={p.href} href={p.href} className="flex min-h-12 items-center gap-3 font-heading text-xl font-medium">
                <Phone size={20} className="text-sage" aria-hidden /> <span className="link-u">{p.display}</span>
              </a>
            ))}
            {site.extraPhones.map((p) => (
              <a key={p.href} href={p.href} className="flex min-h-12 flex-wrap items-center gap-x-3 font-heading text-xl font-medium">
                <Phone size={20} className="text-sage" aria-hidden /> <span className="link-u">{p.display}</span>
                <span className="font-body text-[0.9rem] font-normal"><T>{p.note}</T></span>
              </a>
            ))}
            <a href={`mailto:${site.email}`} className="flex min-h-12 items-center gap-3 text-lg">
              <Mail size={20} className="text-sage" aria-hidden /> <span className="link-u">{site.email}</span>
            </a>
          </div>
        </div>

        <div className="rounded-[var(--radius-card)] bg-white p-4 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2">
            <Sub className="text-xl">Режим работы</Sub>
            <OpenNow className="text-sage-dark" />
          </div>
          <HoursTable />
        </div>

        <RouteFinder />
      </Reveal>
      <Reveal delay={0.1}>
        <MapScheme />
      </Reveal>
    </div>
  );
}
