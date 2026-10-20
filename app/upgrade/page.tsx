import type { Metadata } from 'next';
import { Reveal } from '@/components/motion/Reveal';
import { PageHead } from '@/components/ui/PageHead';
import { T } from '@/components/ui/Text';
import { auditSource, launchSteps, upgradeGroups } from '@/content/upgrade';
import { measured } from '@/content/measured';

export const metadata: Metadata = { title: 'Что изменится по сравнению с нынешним сайтом' };

export default function UpgradePage() {
  return (
    <>
      <PageHead
        eyebrow="Для клиники"
        title="Что изменится по сравнению с нынешним сайтом"
        lead="Спокойное сравнение по фактам. Нынешний сайт сделан давно и в целом работает, но у него есть вещи, которые мешают пациентам записаться."
      />
      <section className="section-y">
        <div className="container-x space-y-12">
          {upgradeGroups.map((g) => (
            <Reveal key={g.title}>
              <h2 className="mb-5 text-2xl">{g.title}</h2>
              <div className="overflow-hidden rounded-[var(--radius-card)] bg-white shadow-soft">
                <div className="hidden grid-cols-[180px_1fr_1fr] gap-6 border-b border-line bg-mint-soft px-6 py-3 font-heading text-[0.95rem] text-mute md:grid">
                  <span>Тема</span><span>Сейчас</span><span>В новой версии</span>
                </div>
                <ul className="divide-y divide-line">
                  {g.rows.map((r) => (
                    <li key={r.topic} className="grid gap-2 px-6 py-5 md:grid-cols-[180px_1fr_1fr] md:gap-6">
                      <span className="font-heading text-lg font-medium">{r.topic}</span>
                      <span><span className="mb-0.5 block text-[0.8rem] uppercase tracking-wide text-mute md:hidden">Сейчас</span><T>{r.now}</T></span>
                      <span><span className="mb-0.5 block text-[0.8rem] uppercase tracking-wide text-sage md:hidden">В новой версии</span><T>{r.next.replace('{weight}', measured.weightText)}</T></span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
          <p className="text-[0.92rem] text-mute">Источник по нынешнему сайту: {auditSource}. Показатели нового сайта измерены на этой версии концепта: {measured.lighthouse}.</p>

          <Reveal className="rounded-[var(--radius-lg)] bg-mint-soft p-6 sm:p-8">
            <h2 className="text-2xl">Что нужно от клиники для запуска</h2>
            <ol className="mt-4 space-y-3">
              {launchSteps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sage font-heading text-white">{i + 1}</span>
                  <span className="pt-1">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-[0.95rem] text-mute">Все места, где данных пока нет, на сайте помечены пунктирной рамкой в квадратных скобках.</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
