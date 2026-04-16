'use client';
import Image from 'next/image';
import { forwardRef } from 'react';
import { ChangelogItem } from './content';

const Card = forwardRef<HTMLDivElement, ChangelogItem>(
  ({ id, dataMonth, title, tag, status, summary, highlights, image }, ref) => {
    return (
      <div
        ref={ref}
        id={id}
        data-month={dataMonth}
        className=" lg:p-8 p-5 bg-background-2 dark:bg-background-6 rounded-[20px] border border-stroke-1 dark:border-background-7">
        <div className="space-y-4 mb-14">
          <h3>{title}</h3>
          <span className="py-2 px-5 bg-background-12 dark:bg-background-7 border border-stroke-1 dark:border-background-7 rounded-full text-tagline-1 font-normal text-secondary dark:text-accent inline-flex">
            {tag}
          </span>
        </div>
        <div>
          <p className="text-heading-5 font-normal text-secondary dark:text-accent mb-3">{status}</p>
          <p>{summary}</p>
          <p className="text-heading-6 font-normal text-secondary dark:text-accent mt-6 mb-4">Highlights</p>
          <ul className="space-y-3 mt-4 mb-10.5">
            {highlights.map((highlight, index) => (
              <li className="flex items-center gap-x-2" key={index + 1}>
                <span className="size-5 rounded-full bg-secondary dark:bg-accent shrink-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width={10} height={7} viewBox="0 0 10 7" fill="none">
                    <path
                      d="M4.31661 6.75605L9.74905 1.42144C10.0836 1.0959 10.0836 0.569702 9.74905 0.244158C9.41446 -0.081386 8.87363 -0.081386 8.53904 0.244158L3.7116 4.99012L1.46096 2.78807C1.12636 2.46253 0.585538 2.46253 0.250945 2.78807C-0.0836483 3.11362 -0.0836483 3.63982 0.250945 3.96536L3.1066 6.75605C3.27347 6.91841 3.49253 7 3.7116 7C3.93067 7 4.14974 6.91841 4.31661 6.75605Z"
                      className="fill-accent dark:fill-secondary"
                    />
                  </svg>
                </span>
                <p className="text-secondary/80 dark:text-accent/80">{highlight}</p>
              </li>
            ))}
          </ul>
          <figure className="rounded-[20px] overflow-hidden">
            <Image src={image.src} alt={image.alt} className="w-full h-full object-cover" width={869} height={572} />
          </figure>
        </div>
      </div>
    );
  },
);

Card.displayName = 'Card';
export default Card;
