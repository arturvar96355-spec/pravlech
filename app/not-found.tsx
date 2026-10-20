import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="section-y">
      <div className="container-x text-center">
        <p className="eyebrow mb-3">Ошибка 404</p>
        <h1 className="text-4xl">Такой страницы нет</h1>
        <p className="mx-auto mt-4 max-w-md text-mute">Возможно, ссылка устарела. Вернитесь на главную или позвоните — администратор подскажет.</p>
        <div className="mt-8"><ButtonLink href="/" size="lg">На главную</ButtonLink></div>
      </div>
    </section>
  );
}
