import RevealAnimation from '@/components/animation/RevealAnimation';

const CTA = () => {
  return (
    <div className="dark:bg-background-8 bg-white pt-16 pb-16 md:pt-20 md:pb-20 lg:pt-[90px] lg:pb-[90px] xl:pt-[100px] xl:pb-[100px]">
      <div className="mb-10 space-y-5 text-center sm:mb-14">
        <RevealAnimation delay={0.1}>
          <span className="badge !badge-green">Journal</span>
        </RevealAnimation>
        <div className="space-y-3">
          <RevealAnimation delay={0.2}>
            <h2 className="text-secondary dark:text-accent font-normal text-white">Start selling smarter today</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <p className="mx-auto max-w-[534px]">
              Pellentesque lectus cum neque cursus sapien massa laoreet varius. Ultricies faucibus donec tellus cras
              ornare.
            </p>
          </RevealAnimation>
        </div>
      </div>

      <RevealAnimation delay={0.4}>
        <form className="flex flex-col items-center justify-center gap-y-5 md:flex-row md:gap-x-3 md:gap-y-0">
          <fieldset className="inline-block">
            <input
              type="text"
              placeholder="Enter your email"
              className="shadow-1 placeholder:text-secondary/50 border-stroke-1 dark:border-stroke-7 dark:bg-background-6 dark:placeholder:text-accent/50 h-12 w-[85%] rounded-full border px-[18px] py-3 font-normal outline-none placeholder:font-normal md:w-[340px]"
            />
          </fieldset>
          <button className="btn btn-md hover:btn-secondary dark:hover:btn-accent btn-primary h-12 w-full md:w-auto">
            <span>Get started</span>
          </button>
        </form>
      </RevealAnimation>
    </div>
  );
};

CTA.displayName = 'CTA';
export default CTA;
