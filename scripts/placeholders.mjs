// Находит все заглушки вида [ … ] в /content и печатает уникальный список с файлами.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = new URL('../content/', import.meta.url).pathname;
const found = new Map();

for (const file of readdirSync(dir).filter((f) => f.endsWith('.ts'))) {
  const src = readFileSync(join(dir, file), 'utf8');
  // только строковые литералы: '...' "..." `...`
  for (const m of src.matchAll(/(['"`])((?:\\.|(?!\1).)*)\1/g)) {
    for (const ph of m[2].matchAll(/\[[^\]\[]*[а-яё][^\]\[]*\]/gi)) {
      const text = ph[0];
      if (!found.has(text)) found.set(text, new Set());
      found.get(text).add(file);
    }
  }
}

const rows = [...found.entries()].sort((a, b) => a[0].localeCompare(b[0], 'ru'));
console.log(`Заглушек (уникальных): ${rows.length}\n`);
for (const [text, files] of rows) console.log(`${text}\n    ${[...files].join(', ')}`);
