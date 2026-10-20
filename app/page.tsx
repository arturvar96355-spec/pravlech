import { CheckupSection } from '@/components/sections/CheckupSection';
import { ContactsSection } from '@/components/sections/ContactsSection';
import { DoctorsSection } from '@/components/sections/DoctorsSection';
import { Hero } from '@/components/sections/Hero';
import { PricesSection } from '@/components/sections/PricesSection';
import { PromosSection } from '@/components/sections/PromosSection';
import { ProcessScene } from '@/components/sections/ProcessScene';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { TriageSection } from '@/components/sections/TriageSection';
import { WhySection } from '@/components/sections/WhySection';

export default function Home() {
  return (
    <>
      <Hero />
      <TriageSection />
      <DoctorsSection />
      <ProcessScene />
      <CheckupSection />
      <PricesSection />
      <PromosSection />
      <WhySection />
      <ReviewsSection />
      <ContactsSection />
    </>
  );
}
