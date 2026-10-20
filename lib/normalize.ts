/** Нижний регистр, ё → е, лишние пробелы — для поиска. */
export function normalize(value: string): string {
  return value.toLowerCase().replace(/ё/g, 'е').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
}

/** Разбивает text на куски так, чтобы совпадения с query были подсвечены (ё/е нечувствительно). */
export function highlight(text: string, query: string): Array<{ text: string; match: boolean }> {
  const q = normalize(query);
  if (!q) return [{ text, match: false }];
  // normalize сохраняет длину строки, пока нет сжатия пробелов, — сравниваем посимвольно
  const flat = text.toLowerCase().replace(/ё/g, 'е').replace(/ /g, ' ');
  const out: Array<{ text: string; match: boolean }> = [];
  let i = 0;
  while (i < text.length) {
    const at = flat.indexOf(q, i);
    if (at === -1) {
      out.push({ text: text.slice(i), match: false });
      break;
    }
    if (at > i) out.push({ text: text.slice(i, at), match: false });
    out.push({ text: text.slice(at, at + q.length), match: true });
    i = at + q.length;
  }
  return out;
}
