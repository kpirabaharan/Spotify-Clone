import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface BoxProps extends PropsWithChildren {
  className?: string;
}

const Box = ({ children, className }: BoxProps) => {
  return (
    <div
      className={twMerge(`bg-neutral-900 rounded-lg h-fit w-full`, className)}
    >
      {children}
    </div>
  );
};

export default Box;
