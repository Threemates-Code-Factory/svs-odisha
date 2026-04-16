import industry1Img from '@public/images/ns-img-232.png';
import industry2Img from '@public/images/ns-img-233.png';
import industry3Img from '@public/images/ns-img-234.png';
import Image from 'next/image';
import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';

const industries = [
  {
    id: 1,
    img: industry1Img,
    alt: 'industry-1',
    title: 'Vacation rentals',
    desc: 'Enjoy fully furnished spaces with amenities like full kitchens,',
    href: '/integration',
  },
  {
    id: 2,
    img: industry2Img,
    alt: 'industry-2',
    title: 'Corporate housing',
    desc: 'Corporate housing offers a convenient and comfortable living solution for business',
    href: '/integration',
  },
  {
    id: 3,
    img: industry3Img,
    alt: 'industry-3',
    title: 'Hotels & resorts',
    desc: 'Discover a world where comfort meets elegance. Our curated collection of hotels',
    href: '/integration',
  },
];

const IndustryCategories = () => {
  return (
    <section className="bg-background-3 dark:bg-background-7 py-20 md:py-[100px] lg:py-36 xl:py-[200px]">
      <div className="main-container">
        <div className="mx-auto mb-10 max-w-[595px] space-y-3 text-center md:mb-[72px]">
          <RevealAnimation delay={0.1}>
            <span className="badge badge-green mb-5">integration</span>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <h2>Industries we serve</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <p>
              we deliver tailored solutions that meet the unique needs of each sector. Our cross-industry expertise
              allows us to innovate, adapt, and drive results that
            </p>
          </RevealAnimation>
        </div>
        <div className="grid grid-cols-12 gap-y-14 md:gap-x-8">
          {industries.map((item, idx) => (
            <RevealAnimation key={item.id} delay={0.4 + idx * 0.1}>
              <article className="col-span-12 md:col-span-6 lg:col-span-4">
                <div className="group relative">
                  <Link href={item.href}>
                    <figure className="max-w-full overflow-hidden rounded-[12px] lg:max-w-[408px]">
                      <Image
                        src={item.img}
                        alt={item.alt}
                        className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-[108%] group-hover:rotate-[3deg]"
                      />
                    </figure>

                    <div className="bg-secondary/40 dark:bg-accent/40 absolute bottom-2.5 left-1/2 w-[calc(100%-20px)] -translate-x-1/2 rounded-lg p-6 text-center backdrop-blur-[12px]">
                      <h3 className="text-heading-6 md:text-heading-5 dark:text-secondary text-white">{item.title}</h3>
                      <p className="text-tagline-2 text-accent/80 dark:text-secondary/80 mx-auto max-w-[295px]">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                </div>
              </article>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryCategories;
