import type { ReactNode } from 'react';
import { Reveal } from '../motion/Reveal';

export function SectionHead({ eyebrow, title, lead, id, children }: { eyebrow?: string; title: string; lead?: ReactNode; id?: string; children?: ReactNode }) {
  return (
    <Reveal className="mb-10 max-w-3xl lg:mb-14">
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 id={id} className="text-[clamp(1.9rem,4.5vw,3rem)]">{title}</h2>
      {lead && <p className="mt-4 text-lg text-mute">{lead}</p>}
      {children}
    </Reveal>
  );
}
