'use client';

import { useState, useEffect } from 'react';
import {
  BsPauseFill,
  BsPlayFill,
  BsRepeat,
  BsRepeat1,
  BsShuffle,
} from 'react-icons/bs';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import useSound from 'use-sound';

import { Song } from '@/types';

import MediaItem from './MediaItem';
import LikeButton from './LikeButton';
import Slider from './Slider';
import usePlayer from '@/hooks/usePlayer';

interface PlayerContentProps {
  volume: number;
  setVolume: (vol: number) => void;
  isLoop: boolean;
  setIsLoop: (val: boolean) => void;
  oldVolume: number;
  setOldVolume: (vol: number) => void;
  song: Song;
  songUrl: string;
}

const PlayerContent = ({
  volume,
  setVolume,
  isLoop,
  setIsLoop,
  oldVolume,
  setOldVolume,
  song,
  songUrl,
}: PlayerContentProps) => {
  const player = usePlayer();
  const [isPlaying, setIsPlaying] = useState(true);

  // Play Song
  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => {
      setIsPlaying(false);
    },
    format: ['mp3'],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume !== 0) {
      setOldVolume(volume);
      setVolume(0);
    } else {
      setVolume(oldVolume);
    }
  };

  // Play Previous Song
  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  // Play Next Song
  const onPlayNext = (clicked = false) => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    let nextSong: string;

    if (isLoop && !clicked) {
      nextSong = player.ids[currentIndex];
    } else {
      nextSong = player.ids[currentIndex + 1];
    }

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    return player.setId(nextSong);
  };

  const onLoop = () => {
    if (isLoop) {
      setIsLoop(false);
    } else {
      setIsLoop(true);
    }
  };

  // Player Icons
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 h-full'>
      <div className='flex w-full justify-start'>
        <div className='flex items-center gap-x-2 max-w-[250px]'>
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className='flex gap-x-4 md:hidden col-auto w-full justify-end items-center'>
        <VolumeIcon onClick={toggleMute} className='cursor-pointer' size={25} />
        <div
          onClick={handlePlay}
          className='h-10 w-10 flex items-center justify-center rounded-full 
          bg-white p-1 cursor-pointer'
        >
          <Icon size={30} className='text-black' />
        </div>
      </div>

      <div
        className='hidden md:flex h-full justify-center items-center w-full 
        max-w-[722px] gap-x-6'
      >
        <BsShuffle
          size={23}
          className='text-neutral-400 cursor-pointer hover:text-white transition'
        />
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className='text-neutral-400 cursor-pointer hover:text-white transition'
        />
        <div
          onClick={handlePlay}
          className='flex items-center justify-center h-10 w-10 rounded-full 
          bg-white p-1 cursor-pointer hover:scale-110'
        >
          <Icon size={30} className='text-black' />
        </div>
        <AiFillStepForward
          onClick={() => onPlayNext(true)}
          size={30}
          className='text-neutral-400 cursor-pointer hover:text-white transition'
        />
        {isLoop ? (
          <BsRepeat1
            onClick={onLoop}
            size={23}
            className='text-neutral-400 cursor-pointer hover:text-white transition'
          />
        ) : (
          <BsRepeat
            onClick={onLoop}
            size={23}
            className='text-neutral-400 cursor-pointer hover:text-white transition'
          />
        )}
      </div>

      <div className='hidden md:flex w-full justify-end pr-2'>
        <div className='flex items-center gap-x-2 w-[120px]'>
          <VolumeIcon
            onClick={toggleMute}
            className='cursor-pointer'
            size={30}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
