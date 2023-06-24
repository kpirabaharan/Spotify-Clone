'use client';

import usePlayer from '@/hooks/usePlayer';
import useLoadSong from '@/hooks/useLoadSong';
import useGetSongById from '@/hooks/useGetSongById';

import PlayerContent from './PlayerContent';

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSong(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  console.log('Player');

  return (
    <div className='fixed bottom-0 bg-black w-full py-2 h-[80px] px-4'>
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};

export default Player;
