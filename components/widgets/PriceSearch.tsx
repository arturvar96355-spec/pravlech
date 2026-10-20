'use client';

import { Search } from 'lucide-react';
import { Fragment, useMemo, useState } from 'react';
import { priceGroups } from '@/content/prices';
import { highlight, matchesQuery } from '@/lib/normalize';
import { priceLabel } from '@/lib/price';
import { typograph } from '@/lib/typograph';
import { T } from '../ui/Text';

function Marked({ text, query }: { text: string; query: string }) {
  return (
    <>
      {highlight(typograph(text), query).map((p, i) =>
        p.match ? (
          <mark key={i} className="rounded bg-peach px-0.5 text-ink">{p.text}</mark>
        ) : (
          <Fragment key={i}>{p.text}</Fragment>
        ),
      )}
    </>
  );
}

export function PriceSearch() {
  const [query, setQuery] = useState('');
  const groups = useMemo(() => {
    return priceGroups
      .map((g) => ({
        ...g,
        items: g.items.filter((i) => !query.trim() || matchesQuery(`${i.title} ${g.title} ${i.note ?? ''}`, query)),
      }))
      .filter((g) => g.items.length);
  }, [query]);

  return (
    <div>
      <label className="relative block">
        <span className="sr-only">Поиск по прайсу</span>
        <Search className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-mute" size={22} />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Что ищете? Например, УЗИ или кардиолог"
          className="h-16 w-full rounded-full border-2 border-line bg-white pl-14 pr-5 text-[1.05rem] outline-none transition-colors focus:border-sage"
        />
      </label>

      <div className="mt-6 space-y-8" aria-live="polite">
        {groups.map((g) => (
          <section key={g.id} aria-labelledby={`pg-${g.id}`}>
            <h3 id={`pg-${g.id}`} className="mb-3 text-xl">{g.title}</h3>
            {g.source && <p className="-mt-1 mb-3 text-[0.9rem] text-mute">{g.source}</p>}
            <ul className="divide-y divide-line overflow-hidden rounded-[var(--radius-card)] bg-white shadow-soft">
              {g.items.map((i) => (
                <li key={i.id} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-4">
                  <span>
                    <Marked text={i.title} query={query} />
                    {i.note && <span className="block text-[0.9rem] text-mute">{typograph(i.note)}</span>}
                  </span>
                  <span className="font-heading font-medium text-sage">
                    <T>{priceLabel(i)}</T>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {!groups.length && (
          <p className="rounded-[var(--radius-card)] bg-white p-6 text-mute shadow-soft">
            Такой позиции в прайсе нет. Позвоните — администратор подскажет.
          </p>
        )}
      </div>
    </div>
  );
}
