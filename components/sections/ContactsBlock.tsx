import { MapPin, Phone } from 'lucide-react';
import { site } from '@/content/site';
import { ButtonLink } from '../ui/Button';
import { MapScheme } from '../ui/MapScheme';
import { T } from '../ui/Text';
import { HoursTable } from '../widgets/HoursTable';
import { OpenNow } from '../widgets/OpenNow';
import { Reveal } from '../motion/Reveal';

export function ContactsBlock({ level = 2 }: { level?: 2 | 3 }) {
  const Sub = level === 2 ? 'h2' : 'h3';
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Reveal className="space-y-6">
        <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-soft">
          <p className="flex items-start gap-3 text-lg">
            <MapPin className="mt-1 shrink-0 text-sage" aria-hidden />
            <span>{site.address.street}<br /><span className="text-mute">{site.address.district}</span></span>
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={site.address.mapsUrl}>Открыть в Яндекс Картах</ButtonLink>
          </div>
          <p className="mt-3 text-[0.9rem] text-mute"><T>{site.address.mapsLinkNote}</T></p>
          <div className="mt-6 space-y-1">
            {site.phones.map((p) => (
              <a key={p.href} href={p.href} className="flex min-h-12 items-center gap-3 font-heading text-xl font-medium">
                <Phone size={20} className="text-sage" aria-hidden /> <span className="link-u">{p.display}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="rounded-[var(--radius-card)] bg-white p-4 shadow-soft">
          <div className="flex items-center justify-between px-4 py-2">
            <Sub className="text-xl">Режим работы</Sub>
            <OpenNow className="text-sage-dark" />
          </div>
          <HoursTable />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <MapScheme />
      </Reveal>
    </div>
  );
}
