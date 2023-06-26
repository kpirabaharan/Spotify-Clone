'use client';

import Image from 'next/image';

import { Song } from '@/types';
import useLoadImage from '@/hooks/useLoadImage';
import usePlayer from '@/hooks/usePlayer';

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem = ({ data, onClick }: MediaItemProps) => {
  const imageUrl = useLoadImage(data);
  const player = usePlayer();

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    return player.setId(data.id);
  };

  return (
    <div
      className='flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 
      w-full p-2 rounded-md'
      onClick={handleClick}
    >
      <div className='relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden'>
        <Image
          className='object-cover'
          fill
          src={imageUrl || '/images/liked.png'}
          alt='Image'
        />
      </div>
      <div className='flex flex-col gap-y-1 overflow-hidden'>
        <p className='text-white truncate'>{data.title}</p>
        <p className='text-neutral-400 text-sm truncate'>{data.artist}</p>
      </div>
    </div>
  );
};

export default MediaItem;
