'use client';

import { Printer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { afterVisitFields, memoDisclaimer } from '@/content/memo';
import { bringChild, bringList, bringNote } from '@/content/preparation';
import { doctorQuestions, MEMO_KEY } from '@/content/questions';
import { site } from '@/content/site';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';
import { T } from '../ui/Text';

function Lines({ n = 3 }: { n?: number }) {
  return (
    <div aria-hidden className="mt-1">
      {Array.from({ length: n }, (_, i) => (
        <div key={i} className="h-9 border-b border-[#9aa6a1]" />
      ))}
    </div>
  );
}

/** Памятка: перед приёмом и после него. Печатается на A4. */
export function MemoSheet() {
  const [chosen, setChosen] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(MEMO_KEY);
      if (raw) {
        const list = JSON.parse(raw) as unknown;
        if (Array.isArray(list)) setChosen(list.filter((x): x is string => typeof x === 'string'));
      }
    } catch {
      /* без сохранённых вопросов */
    }
  }, []);

  const toggle = (t: string) => setChosen((l) => (l.includes(t) ? l.filter((x) => x !== t) : [...l, t]));
  const custom = chosen.filter((c) => !doctorQuestions.some((q) => q.text === c));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3 print:hidden">
        <Button size="lg" className="!whitespace-normal text-center" onClick={() => window.print()}><Printer size={20} className="shrink-0" /> Распечатать или сохранить в PDF</Button>
        <p className="text-[0.95rem] text-mute">Вопросы из записи подставились сами. Отметьте или уберите лишние.</p>
      </div>

      <article className="memo-sheet mx-auto max-w-[820px] rounded-[var(--radius-lg)] bg-white p-6 shadow-soft sm:p-10 print:max-w-none print:rounded-none print:p-0 print:shadow-none">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-sage pb-3">
          <h2 className="text-2xl">Памятка пациента</h2>
          <p className="text-[0.95rem] text-mute">{site.fullName} · {site.phones[0].display}</p>
        </div>

        <section className="mt-6" aria-labelledby="memo-before">
          <h3 id="memo-before" className="text-xl">Перед приёмом</h3>
          <p className="mt-1 text-[0.95rem] text-mute">Что спросить у врача</p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2 print:grid-cols-2">
            {doctorQuestions.map((q) => {
              const on = chosen.includes(q.text);
              return (
                <li key={q.id}>
                  <label className="flex min-h-11 cursor-pointer items-start gap-3 py-1">
                    <input type="checkbox" checked={on} onChange={() => toggle(q.text)} className="mt-1 h-5 w-5 shrink-0 accent-[#2f6f5e]" />
                    <span>{q.text}</span>
                  </label>
                </li>
              );
            })}
            {custom.map((c) => (
              <li key={c} className="flex items-start gap-3 py-1">
                <input type="checkbox" checked readOnly aria-label="Свой вопрос" className="mt-1 h-5 w-5 shrink-0 accent-[#2f6f5e]" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.95rem] text-mute">Мои вопросы и заметки</p>
          <Lines n={3} />

          <h4 className="mt-6 font-heading text-lg font-medium">Что взять с собой</h4>
          <ul className="mt-2 grid gap-1 sm:grid-cols-2 print:grid-cols-2">
            {bringList.map((b) => (
              <li key={b} className="flex gap-2"><span aria-hidden>☐</span> {b}</li>
            ))}
          </ul>
          <p className="mt-2 text-[0.92rem] text-mute">{bringChild} <T>{bringNote}</T></p>
        </section>

        <section className="mt-8 break-before-page" aria-labelledby="memo-after">
          <h3 id="memo-after" className="text-xl">После приёма — простыми словами</h3>
          <p className="mt-1 text-[0.95rem] text-mute">Попросите врача объяснить и впишите коротко своими словами.</p>
          <dl className="mt-3 space-y-4">
            {afterVisitFields.map((f) => (
              <div key={f.id}>
                <dt className="font-heading font-medium">{f.label}</dt>
                <dd><Lines n={f.id === 'plan' ? 3 : 2} /></dd>
              </div>
            ))}
          </dl>
          <p className={cn('mt-6 rounded-[var(--radius-md)] bg-mint-soft p-3 text-[0.92rem] print:border print:border-[#9aa6a1] print:bg-white')}>{memoDisclaimer}</p>
          <p className="mt-3 text-[0.92rem] text-mute">Телефоны клиники: {site.phones.map((p) => p.display).join(', ')} · {site.address.zip}, {site.address.street}</p>
        </section>
      </article>
    </div>
  );
}
