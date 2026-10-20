import type { PriceGroup } from '@/content/prices';
import { priceLabel } from '@/lib/price';
import { T } from '../ui/Text';
import { PrintButton } from './PrintButton';

/** Серверная версия таблицы цен одной группы (для страниц направлений и печати). */
export function PriceList({ group }: { group: PriceGroup }) {
  return (
    <div className="print-area">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <p className="text-[0.95rem] text-mute">{group.items.length} позиций · цены клиники на 20.10.2026</p>
        <PrintButton />
      </div>
      <h3 className="hidden text-xl print:block">{group.title}</h3>
      <ul className="divide-y divide-line overflow-hidden rounded-[var(--radius-card)] bg-white shadow-soft print:shadow-none">
        {group.items.map((i) => (
          <li key={i.id} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-3.5">
            <span><T>{i.title}</T></span>
            <span className="font-heading font-medium text-sage"><T>{priceLabel(i)}</T></span>
          </li>
        ))}
      </ul>
    </div>
  );
}
