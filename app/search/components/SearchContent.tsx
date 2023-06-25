'use client';

import { Song } from '@/types';

import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';
import useOnPlay from '@/hooks/useOnPlay';

interface SearchContentProps {
  songs: Song[];
}

const SearchContent = ({ songs }: SearchContentProps) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>
        No Songs Found
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-y-2 w-full px-6'>
      {songs.map((song) => (
        <div key={song.id} className='flex items-center gap-x-2 w-full'>
          <div className='w-[calc(100%-35px)]'>
            <MediaItem data={song} onClick={(id: string) => onPlay(id)} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
