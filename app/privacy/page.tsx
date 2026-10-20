import type { Metadata } from 'next';
import { PageHead } from '@/components/ui/PageHead';
import { T } from '@/components/ui/Text';

export const metadata: Metadata = { title: 'Политика обработки персональных данных' };

export default function PrivacyPage() {
  return (
    <>
      <PageHead eyebrow="Документы" title="Политика обработки персональных данных" />
      <section className="section-y">
        <div className="container-x max-w-3xl space-y-4 text-lg">
          <p><T>[политика — от клиента]</T></p>
          <p className="text-mute">В концепте форма записи ничего не сохраняет на сервере. Введённые данные формируют текст заявки, который Вы сами отправляете в мессенджер администратору. После запуска сайта текст политики и оператора персональных данных укажет клиника.</p>
        </div>
      </section>
    </>
  );
}
