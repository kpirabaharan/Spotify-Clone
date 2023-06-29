'use client';

import Image from 'next/image';

import { Song } from '@/types';
import useLoadImage from '@/hooks/useLoadImage';
import PlayButton from './PlayButton';
import LikeButton from './LikeButton';

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem = ({ data, onClick }: SongItemProps) => {
  const imagePath = useLoadImage(data);

  return (
    <div
      className='relative group flex flex-col items-center justify-center rounded-md 
      overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 
      transition p-3'
    >
      <div
        className='relative aspect-square w-full h-full rounded-md overflow-hidden
      '
      >
        <Image
          className='object-cover'
          src={imagePath || '/images/liked.png'}
          fill
          alt='Image'
        />
      </div>
      <div className='flex flex-col items-start w-full pt-4 gap-y-1'>
        <p className='font-semibold truncate w-full'>{data.title}</p>
        <p className='text-neutral-400 text-sm pb-4 w-full truncate'>
          By {data.artist}
        </p>
      </div>
      <div className='absolute bottom-[100px] right-5'>
        <PlayButton data={data} onClick={onClick} />
      </div>
      <div
        className='absolute opacity-0 bottom-[100px] left-5 rounded-full 
        transition translate translate-y-1/4 group-hover:opacity-100 
        group-hover:translate-y-0 hover:scale-110'
      >
        <LikeButton songId={data.id} />
      </div>
    </div>
  );
};

export default SongItem;
