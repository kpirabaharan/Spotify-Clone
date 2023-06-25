'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Song } from '@/types';
import { useUser } from '@/hooks/useUser';
import useOnPlay from '@/hooks/useOnPlay';

import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';

interface FavoriteContentProps {
  songs: Song[];
}

const FavoriteContent = ({ songs }: FavoriteContentProps) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400 '>
        No Favorite Songs
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-y-2 w-full p-6'>
      {songs.map((song) => (
        <div key={song.id} className='flex items-center gap-x-2 w-full'>
          <div className='w-[calc(100%-35px)]'>
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default FavoriteContent;
