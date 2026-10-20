import type { ReactNode } from 'react';
import { Cardiogram } from '../motion/Cardiogram';

export function PageHead({ eyebrow, title, lead, children }: { eyebrow?: string; title: string; lead?: ReactNode; children?: ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-mint-soft pb-12 pt-12 lg:pb-16 lg:pt-16">
      <div className="container-x relative">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="text-[clamp(2.1rem,5.5vw,3.6rem)]">{title}</h1>
        {lead && <p className="mt-4 max-w-2xl text-lg text-mute">{lead}</p>}
        {children}
        <div className="mt-8 h-10 w-full max-w-md text-sage/60" aria-hidden>
          <Cardiogram className="h-full w-full" strokeWidth={2.5} step={220} />
        </div>
      </div>
    </div>
  );
}
