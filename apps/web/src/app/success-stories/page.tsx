import Clients from '@/components/success-stories/clients';
import GlobalStoriesPerformance from '@/components/success-stories/global-stories-performance';
import Hero from '@/components/success-stories/hero';
import SpotlightStories from '@/components/success-stories/spotlight-stories';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Success Stories - Property Management || NextSaaS',
};

const page = () => {
  return (
    <main className="dark:bg-secondary bg-white">
      <Hero />
      <Clients />
      <SpotlightStories />
      <GlobalStoriesPerformance />
    </main>
  );
};

export default page;
