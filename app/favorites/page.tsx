import Image from 'next/image';

import getLikedSongs from '@/actions/getLikedSongs';

import Header from '@/components/Header';
import LikedContent from './components/FavoriteContent';

export const revalidate = 0;

const Liked = async () => {
  const likedSongs = await getLikedSongs();

  return (
    <div
      className='bg-neutral-900 rounded-lg h-full overflow-hidden overflow-y-auto
      md:mr-2'
    >
      <Header>
        <div className='mt-20'>
          <div className='flex flex-col md:flex-row items-center gap-x-5'>
            <div className='relative h-32 w-32 lg:h-44 lg:w-44'>
              <Image
                fill
                src={'/images/liked.png'}
                alt='Playlist'
                className='object-cover'
              />
            </div>
            <div className='flex flex-col gap-y-2 mt-4 md:mt-0'>
              <p className='hidden md:block font-semibold text-sm'>Playlist</p>
              <h1 className='text-whtie text-4xl sm:text-5xl font-bold'>
                Favorites
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={likedSongs} />
    </div>
  );
};

export default Liked;
