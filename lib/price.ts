import type { PriceItem } from '@/content/prices';
import { formatPrice } from './typograph';

export function priceLabel(item: PriceItem): string {
  if (item.price != null) return formatPrice(item.price);
  if (item.range) return `${formatPrice(item.range[0]).replace('\u00A0₽', '')}–${formatPrice(item.range[1])}`;
  return item.todo ?? '';
}
