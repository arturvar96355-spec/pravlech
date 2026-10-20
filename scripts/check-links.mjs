// Проверяет внутренние ссылки и картинки в собранном out/.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../out/', import.meta.url).pathname;
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const full = join(d, f);
    if (statSync(full).isDirectory()) walk(full);
    else if (f.endsWith('.html')) files.push(full);
  }
})(root);

const broken = new Map();
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) {
    const url = decodeURIComponent(m[1]);
    if (url.startsWith('//')) continue;
    const target = join(root, url);
    const ok = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, 'index.html')));
    if (!ok && !existsSync(target + '.html')) broken.set(url, (broken.get(url) ?? 0) + 1);
  }
}
console.log(`Страниц: ${files.length}`);
if (broken.size) {
  console.log('Битые ссылки:');
  for (const [u, n] of broken) console.log(`  ${u} (${n})`);
  process.exit(1);
}
console.log('Битых внутренних ссылок нет');
