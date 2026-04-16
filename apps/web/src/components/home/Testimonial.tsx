import testimonials from '@/data/json/testimonials/testimonials.json';
import xIconImg from '@public/images/icons/x.svg';
import gradient22Img from '@public/images/ns-img-510.png';
import Image from 'next/image';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import RevealAnimation from '../animation/RevealAnimation';

const Testimonial = () => {
  return (
    <section className="bg-background-1 dark:bg-background-6 py-20 md:py-[100px]">
      <div className="main-container">
        <div className="mx-auto mb-10 max-w-[595px] text-center md:mb-[72px]">
          <RevealAnimation delay={0.1}>
            <span className="badge badge-green mb-5">Testimonial</span>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <h2>Client words</h2>
          </RevealAnimation>
        </div>
      </div>
      {/* testimonial slider */}
      <RevealAnimation delay={0.3}>
        <Marquee autoFill speed={40}>
          <div className="flex items-center gap-x-5 lg:gap-x-10">
            {testimonials.map((testimonial) => {
              return (
                <article
                  key={testimonial.id}
                  className="bg-background-3 dark:bg-background-7 group hover:bg-secondary hover:dark:bg-background-8 relative min-w-[380px] cursor-pointer space-y-6 overflow-hidden rounded-[12px] p-4 backdrop-blur-[22px] transition-all duration-500 ease-in-out first:ml-10 sm:min-w-[400px] lg:min-w-[722px] lg:space-y-10 lg:rounded-[20px] lg:p-14">
                  {/* gradient */}
                  <div className="pointer-events-none absolute -top-[147%] -right-[56%] max-w-[500px] rotate-[295deg] opacity-0 blur-[10px] transition-all duration-500 ease-in-out select-none group-hover:opacity-100 lg:-top-[162%] lg:-right-[56%] lg:max-w-[723px]">
                    <Image src={gradient22Img} alt="gradient" className="h-full w-full object-cover" />
                  </div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <figure className="h-[60px] w-[60px] transform overflow-hidden rounded-full transition-transform duration-500 ease-in-out group-hover:scale-[102%] md:h-[84px] md:w-[84px]">
                        <Image
                          src={testimonial.avatar}
                          width={60}
                          height={60}
                          alt="Michael Lee"
                          className="h-full w-full bg-linear-[156deg,#a585ff_32.92%,#A585FF_91%] object-cover"
                        />
                      </figure>
                      <div className="space-y-1">
                        <h3 className="text-tagline-2 group-hover:text-accent transform font-semibold transition-all duration-500 ease-in-out group-hover:-translate-y-0.5 group-hover:transition-transform">
                          {testimonial.name}
                        </h3>
                        <p className="text-tagline-3 group-hover:text-accent/60 transform transition-all duration-500 ease-in-out group-hover:-translate-y-0.5 group-hover:transition-transform">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit Michael Lee's Twitter"
                      href="https://x.com/heystaticmania"
                      className="bg-background-1 dark:bg-background-6 group-hover:bg-background-1 group-hover:dark:bg-background-7 hover:shadow-4 inline-flex h-11 w-[74px] items-center justify-center rounded-[360px] px-2.5 py-1 backdrop-blur-[15px] transition-all duration-500 ease-in-out hover:scale-110">
                      <Image src={xIconImg} alt="twitter" className="dark:invert" />
                    </Link>
                  </div>
                  <blockquote>
                    <p className="group-hover:text-accent/60 line-clamp-3 max-w-[530px] transform text-wrap transition-all duration-500 ease-in-out group-hover:translate-x-1">
                      {testimonial.quote}
                    </p>
                  </blockquote>
                </article>
              );
            })}
          </div>
        </Marquee>
      </RevealAnimation>
    </section>
  );
};

export default Testimonial;
