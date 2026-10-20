import Link from 'next/link';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'peach' | 'ghost' | 'light';
type Size = 'md' | 'lg';

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full font-heading font-medium whitespace-nowrap select-none transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary: 'bg-sage text-white shadow-soft hover:bg-sage-dark hover:shadow-lift',
  secondary: 'bg-white text-sage border-2 border-sage/25 hover:border-sage hover:bg-mint-soft',
  peach: 'bg-peach text-ink hover:bg-[#efcdb6]',
  ghost: 'text-sage hover:bg-mint',
  light: 'bg-white text-sage-dark hover:bg-mint-soft shadow-soft',
};

const sizes: Record<Size, string> = {
  md: 'px-6 text-base',
  lg: 'min-h-14 px-8 text-[1.05rem]',
};

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function buttonClass({ variant = 'primary', size = 'md', className }: Omit<Common, 'children'>) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant,
  size,
  className,
  children,
  type = 'button',
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClass({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  children,
  href,
  ...rest
}: Common & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const external = /^(tel:|mailto:|https?:)/.test(href);
  const cls = buttonClass({ variant, size, className });
  if (external) {
    return (
      <a href={href} className={cls} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
