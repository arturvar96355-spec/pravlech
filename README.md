# Правильное лечение — сайт-концепт

Статический сайт-концепт для медицинского центра «Правильное лечение» (Москва, Перово). Подготовлен студией Kovagor до первого контакта с клиникой. **Не является официальным сайтом**, не индексируется (`noindex`, `robots.txt` → `Disallow: /`).

Главная мысль: «Врачи, которые объясняют». Запись к врачу — за три клика.

## Стек
Next.js 16 (App Router, `output: 'export'`), TypeScript strict, Tailwind CSS v4 (`@theme` в `app/globals.css`), Motion, GSAP + ScrollTrigger, Lenis, `next/font` (Rubik + Onest), lucide-react, react-hook-form + zod. Бэкенда, БД, API routes и платных сервисов нет.

## Запуск
```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run build        # статическая сборка в out/
npm start            # раздаёт out/ локально (npx serve out)
```
Нужен Node.js 20+ (проверено на 22).

## Где что лежит
```
app/                 страницы: /, /doctors, /doctors/[slug], /services, /checkup, /contacts, /privacy, /styleguide
components/sections  секции главной по порядку из ТЗ
components/widgets   запись (drawer на 3 шага), «С чем Вы пришли», карточки врачей, чек-ап, поиск по прайсу, «Открыто сейчас»
components/motion    Reveal, SplitLines, CountUp, Magnetic, Cardiogram, LenisProvider
components/ui        кнопки, бейджи, монограммы, иконки, иллюстрации
content/             ВЕСЬ текст, цены, телефоны, врачи, отзывы — типизированные данные
lib/                 typograph(), booking.ts (текст заявки, ссылка в Telegram), schedule.ts (режим, слоты), normalize.ts (ё/е)
public/              favicon.svg, og.jpg, robots.txt
```
Все тексты, цены и контакты лежат в `/content`. В компонентах их нет — после сделки этот слой переедет в CMS.

### Как внести данные клиента
- Телефоны, адрес, режим, Telegram (куда уходят заявки), e-mail, лицензия, реквизиты — `content/site.ts`.
- Врачи — `content/doctors.ts`. Направления — `content/services.ts`. Прайс (одна таблица на весь сайт) — `content/prices.ts`. Чек-ап — `content/checkup.ts`. Акции — `content/promos.ts`.
- Подсказки «С чем Вы пришли» — `content/triage.ts`. Отзывы — `content/reviews.ts`.
- Источники фото — `content/credits.ts`.

### Заглушки
Всё, чего нет в исходных данных, показано на сайте пунктирной рамкой в квадратных скобках: `[стаж — уточнить]`.
```bash
npm run placeholders   # список всех заглушек из /content
```

## Деплой
**Основной вариант — Cloudflare Pages.**
1. Подключить GitHub-репозиторий.
2. Build command: `npm run build`. Output directory: `out`. Node 22.
3. Переменные окружения не нужны.

**Резерв — GitHub Pages.** Есть workflow `.github/workflows/pages.yml`: при пуше в `main` собирает сайт с `BASE_PATH=/<имя репозитория>` и публикует `out/`. В настройках репозитория: Settings → Pages → Source: GitHub Actions. Если сайт не в корне домена, `BASE_PATH` обязателен.

**Vercel** — только запасной вариант: из России открывается нестабильно.

После деплоя проверить с мобильного интернета из России без VPN: загрузка, шрифты (они подтягиваются на этапе сборки и отдаются с самого сайта), запись, конструктор чек-апа, поиск по прайсу.

## Проверено
- Сценарии (Playwright): запись из шапки и со страницы врача, маска телефона, валидация согласия, текст заявки, Esc, «С чем Вы пришли», пресеты и сумма чек-апа, выходная скидка, поиск по прайсу (регистр, ё/е), `prefers-reduced-motion`.
- Горизонтального скролла нет на 360, 390, 768, 1024, 1440, 1920 px.
- Lighthouse (мобильный): Performance 88–91, Accessibility 98–100, Best Practices 100. SEO ниже из-за `noindex` — так задумано.

Решения и допущения: [DECISIONS.md](./DECISIONS.md).
