import type { Metadata } from 'next';
import { PageHead } from '@/components/ui/PageHead';
import { T } from '@/components/ui/Text';
import { ph } from '@/content/placeholders';
import { site } from '@/content/site';

export const metadata: Metadata = { title: 'Политика обработки персональных данных' };

export default function PrivacyPage() {
  return (
    <>
      <PageHead eyebrow="Документы" title="Политика обработки персональных данных" />
      <section className="section-y">
        <div className="container-x max-w-3xl space-y-4 text-lg">
          <p><T>{ph.policy}</T></p>
          <ul className="space-y-2">
            <li><a className="link-u text-sage" href={site.policyUrl} target="_blank" rel="noopener noreferrer">Политика конфиденциальности клиники</a></li>
            <li><a className="link-u text-sage" href={site.pdnRulesUrl} target="_blank" rel="noopener noreferrer">Правила обработки персональных данных клиники</a></li>
          </ul>
          <section aria-labelledby="local-data" className="rounded-[var(--radius-card)] bg-mint-soft p-5">
            <h2 id="local-data" className="text-xl">Что сайт помнит на Вашем устройстве</h2>
            <p className="mt-2">Только если Вы сами поставите галочку «Запомнить» при записи, в браузере сохранятся Ваше имя, телефон, имена близких и последний выбранный врач или направление. Сведений о здоровье среди них нет. Эти данные не отправляются на сервер и недоступны клинике. Настройки размера текста и контраста тоже хранятся только в Вашем браузере.</p>
            <p className="mt-2">Удалить всё можно кнопкой «Забыть меня» на главной странице или очисткой данных сайта в браузере.</p>
          </section>
          <p className="text-mute">В концепте форма записи ничего не сохраняет на сервере. Введённые данные формируют текст заявки, который Вы сами отправляете в мессенджер администратору. После запуска сайта текст политики и оператора персональных данных укажет клиника.</p>
        </div>
      </section>
    </>
  );
}
