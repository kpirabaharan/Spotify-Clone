import { twMerge } from 'tailwind-merge';

type AppProps = {
  children: React.ReactNode;
  className?: string;
};

const Box = ({ children, className }: AppProps) => {
  return (
    <div
      className={twMerge(`bg-neutral-900 rounded-lg h-fit w-full`, className)}
    >
      {children}
    </div>
  );
};

export default Box;
