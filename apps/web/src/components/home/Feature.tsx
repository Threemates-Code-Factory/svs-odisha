import avatar1Img from '@public/images/ns-avatar-1.png';
import avatar11Img from '@public/images/ns-avatar-11.png';
import avatar12Img from '@public/images/ns-avatar-12.png';
import avatar2Img from '@public/images/ns-avatar-2.png';
import avatar3Img from '@public/images/ns-avatar-3.png';
import avatar4Img from '@public/images/ns-avatar-4.png';
import avatar5Img from '@public/images/ns-avatar-5.png';
import avatar8Img from '@public/images/ns-avatar-8.png';
import avatar9Img from '@public/images/ns-avatar-9.png';
import feature1Img from '@public/images/ns-img-224.png';
import featureBgImg from '@public/images/ns-img-225.png';
import userActivityProgressImg from '@public/images/ns-img-231.png';
import userActivityProgressDarkImg from '@public/images/ns-img-dark-156.png';
import Image from 'next/image';
import NumberAnimation from '../animation/NumberAnimation';
import RevealAnimation from '../animation/RevealAnimation';
import Map from '../shared/Map';

const Feature = () => {
  return (
    <section className="dark:bg-background-5 pt-20 pb-[100px] md:pt-[100px] lg:pt-36 lg:pb-36 xl:pt-[200px] xl:pb-[200px]">
      <div className="main-container">
        <div className="mx-auto mb-8 max-w-[776px] space-y-3 text-center md:space-y-5 lg:mb-[72px]">
          <RevealAnimation delay={0.1}>
            <span className="badge badge-green">Features</span>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <h2>Robust tools to enhance your property management business.</h2>
          </RevealAnimation>
        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Card 1: Image */}
          <RevealAnimation delay={0.3}>
            <figure className="max-w-[629px] overflow-hidden rounded-[20px]">
              <Image src={feature1Img} className="h-full w-full object-cover" alt="Modern house" />
            </figure>
          </RevealAnimation>
          {/* Card 2: Stats */}
          <RevealAnimation delay={0.4}>
            <div className="bg-secondary relative z-0 max-w-[629px] overflow-hidden rounded-[20px] p-8 dark:bg-[#000203]">
              <div className="absolute -top-5 left-0 h-full w-full">
                <Image src={featureBgImg} alt="Modern house" className="h-full w-full object-cover" />
              </div>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="dark:bg-accent/5 relative flex min-h-[165px] flex-col items-start justify-center space-y-1 rounded-2xl bg-white/15 p-8 pt-9 backdrop-blur-[25px]">
                  {/* Positioning icon */}
                  <div className="absolute top-7 right-7">
                    <span className="ns-shape-10 text-accent text-[36px]" />
                  </div>
                  <span className="text-tagline-1 text-accent/60">Building age</span>
                  <h3 className="text-background-4 text-heading-3 flex items-center gap-2">
                    <NumberAnimation number={10} speed={1000} interval={180} rooms={2} heightSpaceRatio={2.2} />

                    <span className="font-inherit">Y</span>
                  </h3>
                </div>
                {/* Daily visitors */}
                <div className="dark:bg-accent/5 relative flex min-h-[165px] flex-col items-start justify-center space-y-1 rounded-2xl bg-white/15 p-8 pt-9 backdrop-blur-[25px]">
                  {/* component-structure-white icon */}
                  <div className="absolute top-7 right-7">
                    <span className="ns-shape-12 text-accent text-[36px]" />
                  </div>
                  <span className="text-tagline-1 text-accent/60">Daily visitors</span>
                  <h3 className="text-background-4 text-heading-3 flex items-center gap-2">
                    <NumberAnimation number={8950} speed={1500} interval={180} rooms={4} heightSpaceRatio={2.2} />
                  </h3>
                </div>
                {/* Temperature */}
                <div className="dark:bg-accent/5 relative flex min-h-[165px] flex-col items-start justify-center space-y-1 rounded-2xl bg-white/15 p-8 pt-9 backdrop-blur-[25px]">
                  {/* Positioning icon */}
                  <div className="absolute top-7 right-7">
                    <span className="ns-shape-11 text-accent text-[36px]" />
                  </div>
                  <span className="text-tagline-1 text-accent/60">Temperature</span>
                  <h3 className="text-background-4 text-heading-3 flex items-center gap-2">
                    <NumberAnimation number={34} speed={1000} interval={180} rooms={2} heightSpaceRatio={2.1} />
                    <span className="font-inherit">°F</span>
                  </h3>
                </div>
                {/* Occupancy rate */}
                <div className="dark:bg-accent/5 relative flex min-h-[165px] flex-col items-start justify-center space-y-1 rounded-2xl bg-white/15 p-8 pt-9 backdrop-blur-[25px]">
                  <div className="absolute top-7 right-7">
                    <span className="ns-shape-9 text-accent text-[36px]" />
                  </div>
                  <span className="text-tagline-1 text-accent/60">Occupancy rate</span>
                  <h3 className="text-background-4 text-heading-3 flex items-center gap-2">
                    <NumberAnimation number={85} speed={1000} interval={180} rooms={2} heightSpaceRatio={2.2} />
                    <span className="font-inherit">%</span>
                  </h3>
                </div>
              </div>
            </div>
          </RevealAnimation>
          {/* Card 3: Discover surroundings */}
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            <RevealAnimation delay={0.5}>
              <blockquote className="space-y-8">
                <div className="bg-ns-yellow space-y-8 rounded-[20px] p-8">
                  <figure>
                    <div className="flex cursor-pointer -space-x-2.5" aria-label="Team members">
                      <Image
                        className="ring-background-4 dark:ring-background-9 inline-block size-[38px] rounded-full bg-linear-[156deg,#FFF_32.92%,#A585FF_91%] object-cover object-center ring-2"
                        src={avatar9Img}
                        alt="Team member 1"
                      />
                      <Image
                        className="ring-background-4 dark:ring-background-9 inline-block size-[38px] rounded-full bg-linear-[156deg,#FFF_32.92%,#A585FF_91%] object-cover object-center ring-2"
                        src={avatar12Img}
                        alt="Team member 3"
                      />
                      <Image
                        className="ring-background-4 dark:ring-background-9 inline-block size-[38px] rounded-full bg-linear-[156deg,#FFF_32.92%,#A585FF_91%] object-cover object-center ring-2"
                        src={avatar1Img}
                        alt="Team member 3"
                      />
                      <Image
                        className="ring-background-4 dark:ring-background-9 inline-block size-[38px] rounded-full bg-linear-[156deg,#FFF_32.92%,#A585FF_91%] object-cover object-center ring-2"
                        src={avatar2Img}
                        alt="Team member 3"
                      />
                      <Image
                        className="ring-background-4 dark:ring-background-9 inline-block size-[38px] rounded-full bg-linear-[156deg,#FFF_32.92%,#A585FF_91%] object-cover object-center ring-2"
                        src={avatar4Img}
                        alt="Team member 3"
                      />
                      <Image
                        className="ring-background-4 dark:ring-background-9 inline-block size-[38px] rounded-full bg-linear-[156deg,#FFF_32.92%,#A585FF_91%] object-cover object-center ring-2"
                        src={avatar5Img}
                        alt="Team member 3"
                      />
                      <div className="ring-background-4 dark:ring-background-9 text-secondary/80 dark:text-accent bg-ns-cyan text-tagline-2 inline-flex size-[38px] items-center justify-center rounded-full font-medium ring-2">
                        20+
                      </div>
                    </div>
                  </figure>
                  <h3 className="dark:text-secondary text-xl leading-[1.5] font-normal">
                    Discover the <br />
                    surroundings.
                  </h3>
                </div>
                <figure className="bg-secondary dark:bg-accent flex items-center justify-center rounded-[20px] p-8">
                  <Image src={userActivityProgressImg} alt="user-activity-progress" className="block dark:hidden" />
                  <Image src={userActivityProgressDarkImg} alt="user-activity-progress" className="hidden dark:block" />
                </figure>
              </blockquote>
            </RevealAnimation>
            <RevealAnimation delay={0.6}>
              <div className="bg-accent dark:bg-background-8 shadow-1 flex flex-col justify-between rounded-[20px] p-8">
                <div className="flex items-start justify-between">
                  <h3 className="text-heading-5">Tenants</h3>
                  <figure className="relative">
                    <Image
                      src={avatar8Img}
                      className="inline-block size-[70px] rounded-full bg-linear-[156deg,#FFF_32.92%,#A585FF_91%] object-cover object-center"
                      alt="avatar"
                    />
                    <Image
                      src={avatar11Img}
                      className="absolute top-8 right-7 inline-block size-[50px] rounded-full bg-linear-[156deg,#FFF_32.92%,#A585FF_91%] object-cover object-center"
                      alt="avatar"
                    />
                    <Image
                      src={avatar3Img}
                      alt="avatar"
                      className="inline-block size-[50px] rounded-full bg-linear-[156deg,#FFF_32.92%,#A585FF_91%] object-cover object-center"
                    />
                  </figure>
                </div>
                <p className="text-xl leading-[1.5] font-normal max-xl:mt-4">
                  Join over 800 active tenants enjoying the perks of being part of our vibrant community, where you can
                  connect with neighbors
                </p>
              </div>
            </RevealAnimation>
          </div>
          {/* Card 4 Image */}
          <RevealAnimation delay={0.7}>
            <figure className="overflow-hidden rounded-[20px] lg:max-w-[629px]">
              <RevealAnimation delay={0.1}>
                <div className="dark:bg-background-6">
                  <div id="map" className="h-[300px] w-full md:h-[438px]">
                    <Map />
                  </div>
                </div>
              </RevealAnimation>
            </figure>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default Feature;
