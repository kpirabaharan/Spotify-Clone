'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem = ({ image, name, href }: ListItemProps) => {
  const router = useRouter();
  const { user } = useUser();
  const { onOpen } = useAuthModal();

  const onClick = () => {
    if (!user) {
      return onOpen();
    }
    router.push(href);
  };

  return (
    <button
      className='relative group flex items-center rounded-md overflow-hidden
      gap-x-4 bg-neutral-100/10 hover: hover:bg-neutral-100/20 transition pr-4'
      onClick={onClick}
    >
      <div className='relative min-h-[64px] min-w-[64px]'>
        <Image className='object-cover' fill src={image} alt='Image' />
      </div>
      <p className='font-medium truncate py-5'>{name}</p>
      <div
        className='absolute transition opacity-0 rounded-full flex items-center 
        justify-center bg-slate-500 p-4 drop-shadow-md right-5 
        group-hover:opacity-100 hover:scale-110'
      >
        <FaPlay className='text-black' />
      </div>
    </button>
  );
};

export default ListItem;
