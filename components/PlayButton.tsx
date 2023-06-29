'use client';

import { FaPlay } from 'react-icons/fa';

import { Song } from '@/types';

interface PlayButtonProps {
  data: Song;
  onClick: (id: string) => void;
}

const PlayButton = ({ data, onClick }: PlayButtonProps) => {
  return (
    <button
      className='transition opacity-0 rounded-full flex items-center bg-slate-500 
      p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 
      group-hover:translate-y-0 hover:scale-110'
      onClick={() => onClick(data.id)}
    >
      <FaPlay className='text-black' />
    </button>
  );
};

export default PlayButton;
