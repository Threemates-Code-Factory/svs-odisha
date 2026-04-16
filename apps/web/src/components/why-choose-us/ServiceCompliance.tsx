// why choose us service compliance

import nsImg418 from '@public/images/ns-img-418.jpg';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';

const ServiceCompliance = () => {
  return (
    <section className="py-20 xl:py-28">
      <div className="main-container">
        <div className="mb-[70px] space-y-2">
          <RevealAnimation delay={0.1}>
            <h2 className="text-heading-4 lg:text-heading-3">
              Full-service compliance solutions that unlock <br className="max-md:hidden" />
              growth, bolster security posture, and build trust.
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <p>Our powerful platform makes it easy to get compliant and stay compliant.</p>
          </RevealAnimation>
        </div>
        <RevealAnimation delay={0.3}>
          <figure className="overflow-hidden rounded-4xl">
            <Image src={nsImg418} alt="service-compliance" className="h-full w-full object-cover" />
          </figure>
        </RevealAnimation>
      </div>
    </section>
  );
};

ServiceCompliance.displayName = 'ServiceCompliance';
export default ServiceCompliance;
