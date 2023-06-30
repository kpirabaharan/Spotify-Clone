'use client';

import { useState } from 'react';

import usePlayer from '@/hooks/usePlayer';
import useLoadSong from '@/hooks/useLoadSong';
import useGetSongById from '@/hooks/useGetSongById';

import PlayerContent from './PlayerContent';

const Player = () => {
  const [volume, setVolume] = useState(1);
  const [isLoop, setIsLoop] = useState(false);
  const [oldVolume, setOldVolume] = useState(1);

  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const songUrl = useLoadSong(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className='fixed bottom-0 bg-black w-full py-2 h-[80px] px-4'>
      <PlayerContent
        volume={volume}
        setVolume={setVolume}
        isLoop={isLoop}
        setIsLoop={setIsLoop}
        oldVolume={oldVolume}
        setOldVolume={setOldVolume}
        key={songUrl}
        song={song}
        songUrl={songUrl}
      />
    </div>
  );
};

export default Player;
