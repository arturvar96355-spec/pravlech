import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Blob } from '@/components/ui/Blob';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { serviceIcons, ServiceIcon, type ServiceIconName } from '@/components/ui/Icons';
import { Monogram } from '@/components/ui/Monogram';
import { PageHead } from '@/components/ui/PageHead';
import { Stars } from '@/components/ui/Stars';
import { T } from '@/components/ui/Text';
import { ph } from '@/content/placeholders';

export const metadata: Metadata = { title: 'Дизайн-система — Правильное лечение' };

const colors = [
  ['cream', '#FBF8F3', 'Фон'],
  ['sage', '#2F6F5E', 'Главный акцент'],
  ['mint', '#DCEEE6', 'Подложки'],
  ['peach', '#F4D9C6', 'Тёплые акценты, бейджи'],
  ['ink', '#1E2A27', 'Текст'],
  ['mute', '#5D6B67', 'Второй текст'],
] as const;

export default function Styleguide() {
  return (
    <>
      <PageHead eyebrow="Дизайн-система" title="Правильное лечение: основа" lead="Цвета, шрифты, кнопки, карточки и заглушки. Страница для разработки." />
      <div className="container-x space-y-16 py-14">
        <section aria-labelledby="sg-colors">
          <h2 id="sg-colors" className="mb-5 text-2xl">Цвета</h2>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-6">
            {colors.map(([n, hex, use]) => (
              <li key={n}>
                <div className="h-24 rounded-[var(--radius-md)] border border-line" style={{ background: hex }} />
                <p className="mt-2 font-heading font-medium">{n}</p>
                <p className="text-[0.9rem] text-mute">{hex} · {use}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="sg-type">
          <h2 id="sg-type" className="mb-5 text-2xl">Типографика</h2>
          <div className="space-y-3">
            <p className="font-heading text-6xl font-semibold">Врачи, которые объясняют</p>
            <h3 className="text-4xl">Заголовок второго уровня</h3>
            <h4 className="text-2xl">Заголовок третьего уровня</h4>
            <p>Основной текст, 17–18 px, Onest. Предложения короткие. Цена: <T>{'приём терапевта — 3 500 ₽'}</T>.</p>
            <p className="text-mute">Второстепенный текст в цвете mute.</p>
            <p className="eyebrow">Eyebrow-подпись</p>
          </div>
        </section>

        <section aria-labelledby="sg-btn">
          <h2 id="sg-btn" className="mb-5 text-2xl">Кнопки и бейджи</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button>Записаться</Button>
            <Button variant="secondary">Подобрать врача</Button>
            <Button variant="peach">Тёплая</Button>
            <Button variant="ghost">Прозрачная</Button>
            <Button size="lg">Большая</Button>
            <Button disabled>Недоступна</Button>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Badge>Сейчас открыто</Badge>
            <Badge tone="peach">По выходным −10% на анализы</Badge>
            <Badge tone="white">5,0 <Stars size={14} /></Badge>
          </div>
        </section>

        <section aria-labelledby="sg-cards">
          <h2 id="sg-cards" className="mb-5 text-2xl">Карточки, иконки, формы</h2>
          <div className="grid gap-5 md:grid-cols-3 [&>*]:min-w-0">
            <Card>
              <Monogram initials="АВ" />
              <p className="mt-3 font-heading text-lg font-medium">Монограмма вместо фото</p>
              <p className="text-mute"><T>{ph.photo}</T></p>
            </Card>
            <Card>
              <div className="flex flex-wrap gap-3 text-sage">
                {(Object.keys(serviceIcons) as ServiceIconName[]).map((n) => <ServiceIcon key={n} name={n} size={34} />)}
              </div>
              <p className="mt-3 text-mute">Линейные иконки направлений</p>
            </Card>
            <Card className="relative overflow-hidden">
              <Blob className="absolute -right-10 -top-10 h-48 w-48 text-mint" />
              <p className="relative">Blob-форма за контентом</p>
            </Card>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="block"><span className="mb-1.5 block font-medium">Поле ввода</span><input className="h-14 w-full rounded-full border-2 border-line bg-white px-5 outline-none focus:border-sage" placeholder="Имя" /></label>
            <label className="block"><span className="mb-1.5 block font-medium">Поле с ошибкой</span><input aria-invalid className="h-14 w-full rounded-full border-2 border-[#a3361d] bg-white px-5" defaultValue="+7 (9" /></label>
          </div>
        </section>

        <section aria-labelledby="sg-ph">
          <h2 id="sg-ph" className="mb-5 text-2xl">Заглушки для данных клиента</h2>
          <p><T>{'Стаж: [стаж — уточнить]. Лицензия: [номер и дата — от клиента].'}</T></p>
          <div className="mt-3 rounded-[var(--radius-card)] bg-sage-dark p-5 text-white"><T onDark>{'[юридическое лицо — от клиента]'}</T></div>
        </section>
      </div>
    </>
  );
}
