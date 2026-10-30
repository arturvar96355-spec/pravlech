// Генерирует public/og.jpg через Chromium (Playwright). Запуск: node scripts/og.mjs
import { chromium } from 'playwright';

const html = `<html><body style="margin:0;width:1200px;height:630px;background:#FBF8F3;font-family:Rubik,Arial,sans-serif;position:relative;overflow:hidden">
<div style="position:absolute;right:-180px;top:-120px;width:760px;height:760px;border-radius:50%;background:#DDEDE5"></div>
<div style="position:absolute;right:-60px;bottom:-260px;width:520px;height:520px;border-radius:50%;background:#F4D9C6"></div>
<div style="position:absolute;left:80px;top:48px;display:flex;align-items:center;gap:20px">
  <div style="width:68px;height:68px;border-radius:50%;background:#DDEDE5;display:grid;place-items:center"><svg width="40" height="40" viewBox="0 0 64 64"><path d="M8 34h13l5-15 8 28 6-18 4 5h12" fill="none" stroke="#2F6F5E" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
  <b style="font-size:30px;color:#1E2B28">Ясный приём</b></div>
<h1 style="position:absolute;left:80px;top:150px;margin:0;font-size:88px;line-height:1.05;color:#1E2B28;width:700px">Врачи, которые объясняют</h1>
<p style="position:absolute;left:80px;top:372px;margin:0;font-size:30px;color:#6B7A75;width:640px">Многопрофильный медицинский центр. Демо-проект для портфолио</p>
<div style="position:absolute;left:80px;top:500px;padding:22px 30px;background:#fff;border-radius:40px;font-size:28px;color:#2F6F5E">Клиника, врачи и отзывы вымышлены</div>
</body></html>`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html);
await p.screenshot({ path: new URL('../public/og.jpg', import.meta.url).pathname, type: 'jpeg', quality: 88 });
await b.close();
