import type { PriceItem } from '@/content/prices';
import { formatPrice } from './typograph';

export function priceLabel(item: PriceItem): string {
  if (item.onRequest) return 'по запросу';
  if (item.price != null) return `${item.from ? 'от ' : ''}${formatPrice(item.price)}`;
  return item.todo ?? '';
}
