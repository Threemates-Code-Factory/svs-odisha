import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';

const DetailsBody = () => {
  return (
    <section className="md:pb-28 pb-14">
      <div className="main-container">
        <RevealAnimation delay={0.1}>
          <div className="md:p-14 p-9 space-y-6 rounded-4xl bg-background-3 dark:bg-background-8 max-w-[950px] mx-auto">
            <RevealAnimation delay={0.2}>
              <div className="flex items-center gap-x-3">
                <p className="flex items-center gap-x-1 text-secondary dark:text-accent font-medium">
                  <Link href="./glossary-02">Glossary</Link>
                  <span className="size-[22px] flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      className="stroke-secondary dark:stroke-accent">
                      <path d="M7.5 15L12.5 10L7.5 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </p>
                <p>What is A/B testing?</p>
              </div>
            </RevealAnimation>
            <div className="space-y-2">
              <RevealAnimation delay={0.3}>
                <h3 className="text-heading-5 font-normal">What is A/B Testing?</h3>
              </RevealAnimation>
              <RevealAnimation delay={0.4}>
                <p>
                  A/B testing, also known as split testing, is a method used to compare two versions of a webpage,
                  email, or feature to determine which one performs better based on user behavior. In this process,
                  users are randomly shown either version A (the control) or version B (the variation), and their
                  interactions—such as clicks, <br />
                  conversions, or engagement—are measured. By analyzing the data collected, teams can <br />
                  identify which version drives better results and make informed decisions to optimize user experience,
                  boost performance, and achieve business goals more effectively.
                </p>
              </RevealAnimation>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default DetailsBody;
