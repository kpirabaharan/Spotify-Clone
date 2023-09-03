'use client';

import { useState, RefObject } from 'react';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { Root, Portal, Content, Close } from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';
import {
  BsChevronDown,
  BsPauseFill,
  BsPlayFill,
  BsRepeat,
  BsRepeat1,
  BsShuffle,
  BsArrowRight,
} from 'react-icons/bs';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';

import { Song } from '@/types';
import useLoadImage from '@/hooks/useLoadImage';

import LikeButton from '@/components/LikeButton';
import Seekbar from '@/components/Seekbar';
import Slider from '@/components/Slider';
import usePlayerModal from '@/hooks/usePlayerModal';

interface PlayerModalProps {
  data: Song;
  volume: number;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  seek: number;
  setSeek: (vol: number) => void;
  isPlaying: boolean;
  isShuffle: boolean;
  isLoop: boolean;
  onShuffle: () => void;
  onLoop: () => void;
  onPlayPrevious: () => void;
  onPlayNext: (clicked?: boolean) => void;
  handlePlay: () => void;
  playerRef: RefObject<ReactPlayer>;
  playedDuration: string;
  songDuration: string;
}

const PlayerModal = ({
  data,
  volume,
  setVolume,
  toggleMute,
  seek,
  setSeek,
  isPlaying,
  isShuffle,
  isLoop,
  onShuffle,
  onLoop,
  onPlayPrevious,
  onPlayNext,
  handlePlay,
  playerRef,
  playedDuration,
  songDuration,
}: PlayerModalProps) => {
  const imageUrl = useLoadImage(data);
  const [isVolumePopover, setIsVolumePopover] = useState(false);
  const { isOpen, onClose } = usePlayerModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  return (
    <Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Portal>
        <Content
          className='fixed md:hidden drop-shadow-md border border-neutral-700 top-[50%]
          left-[50%] max-h-full h-full w-full translate-x-[-50%] translate-y-[-50%] 
          rounded-md bg-slate-900 p-[25px] focus:outline-none'
        >
          <div className='flex flex-col gap-y-4 w-full h-full p-2 justify-between'>
            <div className='flex flex-row justify-between'>
              <Close asChild>
                <button>
                  <BsChevronDown size={20} />
                </button>
              </Close>
              <p>{data.title}</p>
              <div className='flex flex-row gap-x-4'>
                <Popover.Root
                  open={isVolumePopover}
                  onOpenChange={setIsVolumePopover}
                >
                  <Popover.Trigger asChild>
                    <button>
                      <VolumeIcon size={20} />
                    </button>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content
                      className='bg-black mt-4 h-[150px] w-[50px] 
                      rounded-xl flex items-center justify-center md:hidden'
                    >
                      <Slider
                        orientation='vertical'
                        value={volume}
                        onChange={(value) => setVolume(value)}
                      />
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
                <button onClick={() => {}}>
                  <FiMoreHorizontal size={20} />
                </button>
              </div>
            </div>
            <div className='w-full h-[60%] relative overflow-hidden'>
              <Image
                className='object-cover'
                fill
                src={imageUrl || '/images/liked.png'}
                alt='Image'
              />
            </div>

            <div className='flex flex-col gap-y-4'>
              <div className='flex flex-row justify-between'>
                <div className='flex flex-col gap-y-1'>
                  <p className='font-bold text-xl'>{data.title}</p>
                  <p className='text-neutral-400 text-sm'>{data.artist}</p>
                </div>
                <div className='h-full flex items-center'>
                  <LikeButton songId={data.id} iconSize={30} />
                </div>
              </div>
              <div className='flex flex-col gap-y-1 mt-2'>
                <Seekbar
                  value={seek}
                  onChange={(value) => {
                    playerRef.current?.seekTo(value);
                    setSeek(value);
                  }}
                />
                <div className='flex flex-row w-full justify-between'>
                  <p className='text-xs text-neutral-400'>{playedDuration}</p>
                  <p className='text-xs text-neutral-400'>{songDuration}</p>
                </div>
              </div>
              <div className='flex flex-row w-full justify-between items-center'>
                {!isShuffle ? (
                  <BsArrowRight
                    size={23}
                    onClick={onShuffle}
                    className='text-neutral-400 cursor-pointer hover:text-white transition'
                  />
                ) : (
                  <BsShuffle
                    size={23}
                    onClick={onShuffle}
                    className='text-neutral-400 cursor-pointer hover:text-white transition'
                  />
                )}
                <div className='flex flex-row gap-x-12 items-center'>
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
                    onClick={() => {
                      onPlayNext(true);
                    }}
                    size={30}
                    className='text-neutral-400 cursor-pointer hover:text-white transition'
                  />
                </div>
                {isLoop ? (
                  <BsRepeat1
                    onClick={onLoop}
                    size={23}
                    className='text-white cursor-pointer hover:text-white transition'
                  />
                ) : (
                  <BsRepeat
                    onClick={onLoop}
                    size={23}
                    className='text-neutral-400 cursor-pointer hover:text-white transition'
                  />
                )}
              </div>
            </div>
          </div>
        </Content>
      </Portal>
    </Root>
  );
};

export default PlayerModal;
