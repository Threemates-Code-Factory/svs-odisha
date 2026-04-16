import AchievementWrapper from '@/components/home/AchievementWrapper';
import CTA from '@/components/home/CTA';
import Faq from '@/components/home/Faq';
import Feature from '@/components/home/Feature';
import FeatureHighlights from '@/components/home/FeatureHighlights';
import FeatureV2 from '@/components/home/FeatureV2';
import Hero from '@/components/home/Hero';
import IndustryCategories from '@/components/home/IndustryCategories';
import Integration from '@/components/home/Integration';
import Testimonial from '@/components/home/Testimonial';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Property Management software - NextSaaS',
};

const page = () => {
  return (
    <main className="bg-background-2 dark:bg-background-5 overflow-hidden">
      <Hero />
      <AchievementWrapper />
      <FeatureHighlights />
      <Feature />
      <FeatureV2 />
      <Integration />
      <IndustryCategories />
      <Testimonial />
      <Faq />
      <CTA />
    </main>
  );
};

export default page;
