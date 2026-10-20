/** Нижний регистр, ё → е, лишние пробелы — для поиска. */
export function normalize(value: string): string {
  return value.toLowerCase().replace(/ё/g, 'е').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
}

/** Слова запроса. Окончания отсекаем: «кардиолога» находит «кардиологию». */
export function queryStems(query: string): string[] {
  return normalize(query)
    .split(' ')
    .filter(Boolean)
    .map((t) => (t.length > 5 ? t.slice(0, -2) : t));
}

/** Все слова запроса есть в тексте. */
export function matchesQuery(haystack: string, query: string): boolean {
  const h = normalize(haystack);
  return queryStems(query).every((s) => h.includes(s));
}

/** Разбивает text на куски и отмечает совпадения со словами запроса (ё/е нечувствительно). */
export function highlight(text: string, query: string): Array<{ text: string; match: boolean }> {
  const stems = queryStems(query);
  if (!stems.length) return [{ text, match: false }];
  const flat = text.toLowerCase().replace(/ё/g, 'е').replace(/ /g, ' ');
  const mark = new Array<boolean>(text.length).fill(false);
  for (const s of stems) {
    let at = flat.indexOf(s);
    while (at !== -1) {
      for (let i = at; i < at + s.length; i++) mark[i] = true;
      at = flat.indexOf(s, at + s.length);
    }
  }
  const out: Array<{ text: string; match: boolean }> = [];
  let start = 0;
  for (let i = 1; i <= text.length; i++) {
    if (i === text.length || mark[i] !== mark[start]) {
      out.push({ text: text.slice(start, i), match: mark[start] });
      start = i;
    }
  }
  return out;
}
