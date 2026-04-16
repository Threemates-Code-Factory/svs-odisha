'use client';
import { cn } from '@/utils/cn';
import { useLenis } from 'lenis/react';
import Link from 'next/link';
import HoverBgTransform from './hover-bg-transform';

const TOC = ({ tocData, activeMonth }: { tocData: { id: string; title: string }[]; activeMonth: string | null }) => {
  const lenis = useLenis();

  const handleScroll = (id: string) => {
    lenis?.scrollTo('#' + id, {
      offset: -120,
    });
  };

  return (
    <div className="col-span-12 lg:col-span-3 space-y-8 sticky top-28">
      <div className="space-y-3 relative z-0">
        <p className="text-tagline-2 font-medium text-secondary dark:text-accent">Jump to month</p>
        <div className="space-y-1 relative z-0">
          {tocData.map((item, index) => (
            <Link
              key={index + 1}
              href={`#${item.id}`}
              onClick={() => handleScroll(item.id)}
              className={cn(
                'group relative z-0 rounded-[10px] px-6 py-3.5 flex items-center justify-start text-secondary text-tagline-1 font-normal dark:text-accent transition-colors duration-300 ease-out',
                activeMonth === item.title.toLocaleLowerCase()
                  ? 'bg-background-12 dark:bg-background-6 text-secondary dark:text-accent'
                  : 'hover:bg-background-12 dark:hover:bg-background-6 hover:text-secondary dark:hover:text-accent',
              )}>
              <HoverBgTransform className="group-hover:bg-background-12 dark:group-hover:!bg-background-6 group-hover:text-secondary dark:group-hover:text-accent" />
              <span className="relative z-10 first-letter:uppercase">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TOC;
