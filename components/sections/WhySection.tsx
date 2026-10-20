import { CheckCheck, Clock3, MessageCircleHeart, Sparkles } from 'lucide-react';
import { ph } from '@/content/placeholders';
import { returnTheme, whyCards } from '@/content/reviews';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../motion/Reveal';
import { T } from '../ui/Text';
import { RoomScene } from '../ui/RoomScene';

const icons = { message: MessageCircleHeart, check: CheckCheck, clock: Clock3, sparkle: Sparkles } as const;

export function WhySection() {
  return (
    <section aria-labelledby="why-title" className="section-y">
      <div className="container-x">
        <div className="mb-2 grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
          <SectionHead id="why-title" eyebrow="Почему возвращаются" title="Почему к нам возвращаются" lead={returnTheme} />
          <Reveal className="mb-10 hidden lg:block">
            <RoomScene className="h-auto w-full" />
            <p className="mt-2 text-center text-[0.9rem] text-mute"><T>{ph.centerPhoto}</T></p>
          </Reveal>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyCards.map((c, i) => {
            const Icon = icons[c.icon];
            return (
              <Reveal as="li" key={c.id} delay={i * 0.08} className="group flex flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-mint text-sage"><Icon size={28} strokeWidth={1.6} /></span>
                <h3 className="mt-4 text-xl">{c.title}</h3>
                <p className="mt-2 text-mute"><T>{c.text}</T></p>
                <blockquote className="mt-4 border-t border-line pt-4 text-[0.95rem] italic"><T>{c.quote}</T></blockquote>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
