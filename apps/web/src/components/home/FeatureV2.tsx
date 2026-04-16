import { cn } from '@/utils/cn';
import feature3Img from '@public/images/ns-img-226.png';
import feature4Img from '@public/images/ns-img-227.png';
import feature5Img from '@public/images/ns-img-228.png';
import feature6Img from '@public/images/ns-img-229.png';
import feature7Img from '@public/images/ns-img-230.png';
import featureDark3Img from '@public/images/ns-img-dark-151.png';
import featureDark4Img from '@public/images/ns-img-dark-152.png';
import featureDark5Img from '@public/images/ns-img-dark-153.png';
import featureDark6Img from '@public/images/ns-img-dark-154.png';
import featureDark7Img from '@public/images/ns-img-dark-155.png';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';

const features = [
  {
    id: 1,
    img: feature3Img,
    imgDark: featureDark3Img,
    alt: 'feature-1',
    title: 'Smart scheduling',
    description: 'Auto-assign tasks & updates in real-time',
  },
  {
    id: 2,
    img: feature4Img,
    imgDark: featureDark4Img,
    alt: 'feature-2',
    title: 'Maintenance tracking',
    description: 'Mobile reporting, automated work orders',
  },
  {
    id: 3,
    img: feature5Img,
    imgDark: featureDark5Img,
    alt: 'feature-3',
    title: 'Inspections',
    description: 'Custom forms, AI damage detection',
  },
  {
    id: 4,
    img: feature6Img,
    imgDark: featureDark6Img,
    alt: 'feature-4',
    title: 'Inventory management',
    description: 'Track usage & sync costs with QuickBooks',
  },
  {
    id: 5,
    img: feature7Img,
    imgDark: featureDark7Img,
    alt: 'feature-5',
    title: 'Guest & staff messaging',
    description: 'Automated check-ins, in-app communication',
  },
];

const FeatureV2 = () => {
  return (
    <section className="bg-background-3 dark:bg-background-7 py-20 md:py-[100px] lg:py-36 xl:py-[200px]">
      <div className="main-container">
        <div className="mx-auto mb-10 max-w-[665px] space-y-3 text-center md:space-y-5 lg:mb-[72px]">
          <RevealAnimation delay={0.1}>
            <span className="badge badge-green">Features</span>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <h2>Powerful features to elevate your business</h2>
          </RevealAnimation>
        </div>
        <div className="grid grid-cols-12 justify-items-center gap-y-14 sm:gap-x-8">
          {features.map((item, idx) => (
            <RevealAnimation key={item.id} delay={0.3 + idx * 0.1}>
              <article
                className={cn('col-span-12 space-y-3 md:col-span-6 lg:col-span-4', item.id === 4 && 'lg:col-start-3')}>
                <figure className="max-w-[408px] overflow-hidden rounded-[20px]">
                  <Image src={item.img} alt={item.alt} className="block h-full w-full object-cover dark:hidden" />
                  <Image src={item.imgDark} alt={item.alt} className="hidden h-full w-full object-cover dark:block" />
                </figure>
                <div className="space-y-1">
                  <h3 className="text-heading-6 md:text-heading-5">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureV2;
