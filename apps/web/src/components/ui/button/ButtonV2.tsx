import { cn } from '@/utils/cn';
import Link from 'next/link';

interface ButtonV2Props {
  className?: string;
  href: string;
  btnClass?: string;
  btnText: string;
}

const ButtonV2 = ({ className, href, btnClass, btnText }: ButtonV2Props) => {
  return (
    <div
      className={cn(
        'group/btn-v2 inline-block w-[85%] rounded-full md:w-auto mx-auto md:mx-0 duration-500 transition-transform ease-in-out',
        className,
      )}>
      <Link
        href={href}
        className={cn(
          'inline-flex items-center justify-center rounded-full cursor-pointer gap-1.5 text-center transition-all duration-500 ease-in-out font-medium text-nowrap lowercase w-full md:w-auto mx-auto md:mx-0 h-12 md:h-auto',
          btnClass,
        )}>
        <span className="inline-block transition-transform duration-300 ease-in-out first-letter:uppercase">
          {btnText}
        </span>
        <div className="relative overflow-hidden size-6">
          {/* one  */}
          <span className="group-hover/btn-v2:translate-x-1 -translate-x-6 absolute inset-0 transition-all duration-300 ease-in-out size-6 btn-v2-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M11 5H13V7H11V5Z" />
              <path d="M5 5H7V7H5V5Z" />
              <path d="M14 8H16V10H14V8Z" />
              <path d="M8 8H10V10H8V8Z" />
              <path d="M17 11H19V13H17V11Z" />
              <path d="M11 11H13V13H11V11Z" />
              <path d="M14 14H16V16H14V14Z" />
              <path d="M8 14H10V16H8V14Z" />
              <path d="M11 17H13V19H11V17Z" />
              <path d="M5 17H7V19H5V17Z" />
            </svg>
          </span>
          {/* two  */}
          <span className="group-hover/btn-v2:translate-x-6 absolute -translate-x-2 transition-all duration-300 ease-in-out size-6 btn-v2-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M11 5H13V7H11V5Z" />
              <path d="M5 5H7V7H5V5Z" />
              <path d="M14 8H16V10H14V8Z" />
              <path d="M8 8H10V10H8V8Z" />
              <path d="M17 11H19V13H17V11Z" />
              <path d="M11 11H13V13H11V11Z" />
              <path d="M14 14H16V16H14V14Z" />
              <path d="M8 14H10V16H8V14Z" />
              <path d="M11 17H13V19H11V17Z" />
              <path d="M5 17H7V19H5V17Z" />
            </svg>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ButtonV2;
