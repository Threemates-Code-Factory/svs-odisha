import transactionChart from '@public/images/ns-img-235.svg';
import building from '@public/images/ns-img-236.png';
import profitChart from '@public/images/ns-img-240.png';
import transactionChartDark from '@public/images/ns-img-dark-157.svg';
import profitDarkChart from '@public/images/ns-img-dark-161.png';
import Image from 'next/image';
import NumberAnimation from '../animation/NumberAnimation';
import RevealAnimation from '../animation/RevealAnimation';

const featureItems = [
  {
    id: '1',
    icon: 'ns-shape-10',
    text: 'Unified dashboard for all properties &amp; tenants',
  },
  {
    id: '2',
    icon: 'ns-shape-21',
    text: 'Automated rent collection &amp; reminders',
  },
  {
    id: '3',
    icon: 'ns-shape-11',
    text: 'Online maintenance requests &amp; work orders',
  },
  {
    id: '4',
    icon: 'ns-shape-12',
    text: 'AI-powered tenant screening',
  },
  {
    id: '5',
    icon: 'ns-shape-13',
    text: 'Real-time financial insights',
  },
];

const FeatureHighlights = () => {
  return (
    <section className="bg-background-1 dark:bg-background-6 overflow-hidden pt-20 pb-24 md:pt-32 md:pb-28 lg:pt-36 lg:pb-36 xl:pt-[200px] xl:pb-[200px]">
      <div className="main-container flex flex-col-reverse items-center gap-y-14 lg:flex-row lg:gap-x-24">
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left md:flex-1">
          <div className="mb-14 space-y-5">
            <RevealAnimation delay={0.1}>
              <span className="badge badge-green">Reasons to select us</span>
            </RevealAnimation>
            <div className="space-y-3">
              <RevealAnimation delay={0.2}>
                <h2 className="max-w-[535px]">Modern tools built for today&apos;s property teams.</h2>
              </RevealAnimation>
              <RevealAnimation delay={0.3}>
                <p className="max-w-[508px]">Streamline operations, reduce manual tasks, and maximize revenue.</p>
              </RevealAnimation>
            </div>
          </div>
          <ul className="space-y-2">
            {featureItems.map((feature, index) => (
              <RevealAnimation key={feature.id} delay={0.3 + index * 0.1}>
                <li className="text-tagline-1 dark:text-accent flex items-center gap-4 text-left font-medium md:px-3 md:py-2">
                  <span className={`${feature.icon} text-secondary dark:text-accent text-[36px]`} />
                  {feature.text}
                </li>
              </RevealAnimation>
            ))}
          </ul>
        </div>
        <div className="flex w-full justify-start md:flex-1 lg:w-auto">
          <figure className="relative w-full lg:w-[500px]">
            <RevealAnimation delay={0.7} direction="right" offset={100}>
              <div className="absolute top-[8%] -right-2 z-10 w-[200px] overflow-hidden rounded-2xl sm:-right-4 md:w-[253px] lg:left-[50%] xl:left-[60%] 2xl:left-[68%]">
                <Image
                  src={transactionChart}
                  alt="Transaction chart"
                  className="inline-block h-full w-full object-cover dark:hidden"
                />
                <Image
                  src={transactionChartDark}
                  alt="Transaction chart dark"
                  className="hidden h-full w-full object-cover dark:block"
                />
              </div>
            </RevealAnimation>
            <RevealAnimation delay={0.6} direction="right" offset={100}>
              <div className="absolute top-[13%] right-0 z-10 w-[92px] sm:right-2 lg:right-[1%] xl:-right-[10%] 2xl:-right-[23%]">
                <RevealAnimation delay={0.8} direction="up" offset={150}>
                  <div className="text-heading-6 text-secondary md:text-heading-5 bg-ns-yellow flex -rotate-[14deg] items-center justify-center rounded-[8px] px-2 py-1 font-normal">
                    <NumberAnimation number={20} speed={2500} interval={270} rooms={2} />
                    <span>%</span>
                  </div>
                </RevealAnimation>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={0.5}>
              <div className="w-full">
                <Image src={building} alt="Building" className="w-full" />
              </div>
            </RevealAnimation>
            <RevealAnimation delay={0.8} direction="right" offset={100}>
              <div className="shadow-2 absolute bottom-1/12 left-[0%] w-[200px] overflow-hidden rounded-md sm:left-[40%] sm:w-[340px] md:left-[0%] md:w-[395px] md:rounded-2xl lg:left-[23%] xl:left-[30%] 2xl:left-[40%]">
                <Image src={profitChart} alt="Profit chart" className="shadow-5 block h-full w-full dark:hidden" />
                <Image
                  src={profitDarkChart}
                  alt="Profit chart dark"
                  className="shadow-5 hidden max-w-[200px] rounded-[20px] md:max-w-full dark:block"
                />
              </div>
            </RevealAnimation>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
