import type { SVGProps } from 'react';
import { Brain, Ear, HeartPulse, Stethoscope, TestTube } from 'lucide-react';

type P = { className?: string; size?: number; strokeWidth?: number };

/** УЗИ-датчик — в lucide такого значка нет, рисуем сами. */
export function ProbeIcon({ className, size = 24, strokeWidth = 1.5 }: P) {
  const props: SVGProps<SVGSVGElement> = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  };
  return (
    <svg {...props}>
      <path d="M9.5 2.5h5v6h-5z" />
      <path d="M8 8.5h8l-1.2 3.5H9.2z" />
      <path d="M6.5 15.5a7 7 0 0 0 11 0" />
      <path d="M9 19a4 4 0 0 0 6 0" />
    </svg>
  );
}

export const serviceIcons = {
  heart: HeartPulse,
  brain: Brain,
  ear: Ear,
  probe: ProbeIcon,
  tube: TestTube,
  stetho: Stethoscope,
} as const;

export type ServiceIconName = keyof typeof serviceIcons;

export function ServiceIcon({ name, ...rest }: { name: ServiceIconName } & P) {
  const Icon = serviceIcons[name];
  return <Icon aria-hidden {...rest} />;
}
