import { Fragment } from 'react';
import { typograph } from '@/lib/typograph';

/** Текст из /content: типографика + видимые заглушки `[…]` пунктирной рамкой. */
export function T({ children, onDark = false }: { children: string; onDark?: boolean }) {
  const parts = typograph(children).split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <span key={i} className={onDark ? 'ph ph-on-dark' : 'ph'}>
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
