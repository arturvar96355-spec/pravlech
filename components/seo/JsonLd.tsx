import { doctors } from '@/content/doctors';
import { hours, site } from '@/content/site';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const pad = (n: number) => String(n).padStart(2, '0');

/** Микроразметка клиники и врачей. Сайт-концепт закрыт от индексации, разметка нужна для будущего боевого сайта. */
export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalClinic',
        name: site.name,
        legalName: 'ООО «ЯСНЫЙ ПРИЁМ»',
        telephone: site.phones.map((p) => p.display),
        email: site.email,
        address: {
          '@type': 'PostalAddress',
          postalCode: site.address.zip,
          addressLocality: 'Город N',
          streetAddress: site.address.street,
          addressCountry: 'RU',
        },
        openingHoursSpecification: hours.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: DAYS[h.day],
          opens: `${pad(h.open)}:00`,
          closes: `${pad(h.close)}:00`,
        })),
        aggregateRating: { '@type': 'AggregateRating', ratingValue: site.rating.value, ratingCount: site.rating.marks, bestRating: 5 },
      },
      ...doctors
        .filter((d) => d.specialtyId !== 'procedure')
        .map((d) => ({
          '@type': 'Physician',
          name: d.name,
          medicalSpecialty: d.specialty,
          worksFor: { '@type': 'MedicalClinic', name: site.name },
        })),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
