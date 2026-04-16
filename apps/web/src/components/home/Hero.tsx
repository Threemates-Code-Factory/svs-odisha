import clientLogo1 from '@public/images/icons/client-logo-1.svg';
import clientLogo2 from '@public/images/icons/client-logo-2.svg';
import clientLogo3 from '@public/images/icons/client-logo-3.svg';
import clientLogo4 from '@public/images/icons/client-logo-4.svg';
import clientLogo5 from '@public/images/icons/client-logo-5.svg';
import clientLogoDark1 from '@public/images/icons/client-logo-dark-1.svg';
import clientLogoDark2 from '@public/images/icons/client-logo-dark-2.svg';
import clientLogoDark3 from '@public/images/icons/client-logo-dark-3.svg';
import clientLogoDark4 from '@public/images/icons/client-logo-dark-4.svg';
import clientLogoDark5 from '@public/images/icons/client-logo-dark-5.svg';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/LinkButton';

const clientLogos = [
  { id: 1, light: clientLogo1, dark: clientLogoDark1 },
  { id: 2, light: clientLogo2, dark: clientLogoDark2 },
  { id: 3, light: clientLogo3, dark: clientLogoDark3 },
  { id: 4, light: clientLogo4, dark: clientLogoDark4 },
  { id: 5, light: clientLogo5, dark: clientLogoDark5 },
];

const Hero = () => {
  return (
    <section className="after:from-[rgba(255, 255, 255, 0.00)] dark:after:from-[rgba(0, 0, 0, 0.00)] after:to-background-2 dark:after:to-background-8 relative h-screen bg-[url('/images/ns-img-223.png')] bg-cover bg-center bg-no-repeat object-cover object-top pt-[150px] pb-[100px] after:absolute after:bottom-0 after:left-1/2 after:z-0 after:h-[454px] after:w-full after:-translate-x-1/2 after:bg-gradient-to-b after:from-[20.1%] after:to-[91.31%] after:content-[''] lg:pt-[200px]">
      <div className="main-container">
        <div className="mb-9 space-y-2 text-center md:space-y-4 lg:mb-14">
          <RevealAnimation delay={0.1}>
            <span className="badge badge-blur-v2 mb-6 inline-block">Smart property management software</span>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <h1 className="text-accent dark:text-secondary lg:mx-auto lg:max-w-5xl">
              Simplify property management. boost occupancy.
            </h1>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <p className="text-accent/80 dark:text-secondary/80 lg:mx-auto lg:max-w-[806px]">
              All-in-one platform to manage tenants, automate rent, streamline maintenance, and grow your rental
              business.
            </p>
          </RevealAnimation>
        </div>

        <RevealAnimation delay={0.4}>
          <div className="relative z-30 text-center">
            <LinkButton
              href="/pricing"
              className="btn btn-secondary hover:btn-white dark:btn-accent dark:hover:btn-white-dark btn-lg md:btn-xl mx-auto block w-[90%] md:inline-block md:w-auto">
              Request a demo
            </LinkButton>
          </div>
        </RevealAnimation>

        {/* Client Logos */}

        <div className="before:to-background-2 dark:before:to-background-8 after:to-background-2 dark:after:to-background-8 absolute bottom-[20px] left-1/2 z-10 mx-auto -translate-x-1/2 overflow-hidden before:absolute before:top-0 before:-left-5 before:z-40 before:h-10 before:w-40 before:bg-gradient-to-l before:from-transparent before:content-[''] after:absolute after:top-0 after:right-0 after:z-20 after:h-10 after:w-40 after:bg-gradient-to-r after:from-transparent after:content-[''] max-sm:bottom-[-20px] lg:bottom-[10px] lg:!max-w-[740px]">
          <RevealAnimation delay={0.5} instant={true}>
            <Marquee speed={40} autoFill={true}>
              <div className="flex items-center justify-center gap-8">
                {clientLogos.map((logo) => (
                  <figure key={logo.id} className="ml-8 max-w-max min-w-36">
                    <Image src={logo.light} alt="Client logo" className="block lg:w-auto dark:hidden" />
                    <Image src={logo.dark} alt="Client logo" className="hidden lg:w-auto dark:block" />
                  </figure>
                ))}
              </div>
            </Marquee>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default Hero;
