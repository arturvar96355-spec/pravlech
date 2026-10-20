import Link from 'next/link';
import { site } from '@/content/site';

export function CardioMark({ className = 'h-7 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 28" fill="none" className={className} aria-hidden>
      <path
        d="M1.5 15h8l3.2-9.5 5.2 18 4-11.5 2.4 3h10.2"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — на главную`}
      className={`flex items-center gap-2.5 font-heading text-[1.15rem] font-semibold leading-none ${
        inverted ? 'text-white' : 'text-ink'
      }`}
    >
      <span className={`grid h-10 w-11 place-items-center rounded-full ${inverted ? 'bg-white/15 text-white' : 'bg-mint text-sage'}`}>
        <CardioMark className="h-5 w-7" />
      </span>
      <span>{site.name}</span>
    </Link>
  );
}
