import type { Metadata } from 'next';
import { ReviewNumbers } from '@/components/widgets/ReviewNumbers';
import { ButtonLink } from '@/components/ui/Button';
import { PageHead } from '@/components/ui/PageHead';
import { site } from '@/content/site';

export const metadata: Metadata = { title: 'Отзывы пациентов в цифрах' };

export default function ReviewsPage() {
  return (
    <>
      <PageHead
        eyebrow="Отзывы"
        title="Отзывы пациентов в цифрах"
        lead="О чём чаще всего пишут и кого называют. Нажмите на плитку или врача, чтобы прочитать отзывы."
      />
      <section className="section-y">
        <div className="container-x">
          <ReviewNumbers />
          <div className="mt-10">
            <ButtonLink variant="secondary" className="!whitespace-normal text-center" href={site.address.reviewsUrl}>Все отзывы на Яндекс Картах</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
