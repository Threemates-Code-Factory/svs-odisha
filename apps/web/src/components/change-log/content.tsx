'use client';
import changeLogData from '@/data/json/changelog/changelog.json';
import { useEffect, useRef, useState } from 'react';
import Card from './card';
import TOC from './toc';

export interface ChangelogItem {
  id: string;
  dataMonth: string;
  title: string;
  tag: string;
  status: string;
  summary: string;
  highlights: string[];
  migration?: string[];
  image: {
    src: string;
    alt: string;
  };
}

const Content = () => {
  const changelogData = changeLogData as ChangelogItem[];
  const [activeMonth, setActiveMonth] = useState<string | null>(changelogData[0].dataMonth);
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);

  //   gathering all cards refs
  const setRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) {
      cardsRefs.current[index] = el;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (cards) => {
        cards.forEach((card) => {
          if (card.isIntersecting) {
            setActiveMonth(card.target.getAttribute('data-month') as string);
          }
        });
      },
      {
        rootMargin: '0% 0px -70% 0px',
      },
    );

    // connect observer
    cardsRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    // clean up
    return () => {
      observer.disconnect();
    };
  }, []);

  //   generate toc data
  const tocData = changelogData.map((item) => {
    return {
      id: item.id,
      title: item.dataMonth,
    };
  });

  return (
    <section className="xl:py-28 lg:py-20 py-16">
      <div className="main-container">
        <div className="grid grid-cols-12 items-start lg:gap-x-6 gap-y-6 lg:gap-y-0">
          {/* toc  */}
          <TOC activeMonth={activeMonth} tocData={tocData} />

          {/* //content  */}
          <div className="col-span-12 lg:col-span-9 space-y-2">
            {changelogData.map((item, index) => (
              <Card key={item.id} {...item} ref={setRef(index)} data-month={item.dataMonth} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
