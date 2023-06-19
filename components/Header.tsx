'use client';

import { PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';

import useAuthModal from '@/hooks/useAuthModal';

import Button from './Button';

interface HeaderProps extends PropsWithChildren {
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  const authModal = useAuthModal();
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Handle Logout
  };

  return (
    <div
      className={twMerge(
        `bg-gradient-to-b from-slate-700 p-6 rounded-lg h-fit`,
        className,
      )}
    >
      <div className='w-full mb-4 flex items-center justify-between'>
        <div className='hidden md:flex gap-x-2 items-center'>
          <button
            className='rounded-full bg-black flex items-center justify-center 
            cursor-pointer hover:opacity-75 transition'
            onClick={() => router.back()}
          >
            <RxCaretLeft size={35} className='text-white' />
          </button>
          <button
            className='rounded-full bg-black flex items-center justify-center 
            hover:opacity-75 transition'
            onClick={() => router.forward()}
          >
            <RxCaretRight size={35} className='text-white' />
          </button>
        </div>
        <div className='flex md:hidden gap-x-2 items-center'>
          <button
            className='rounded-full p-2 bg-white flex items-center 
            justify-center hover:opacity-75 transition'
          >
            <HiHome className='text-black' size={20} />
          </button>
          <button
            className='rounded-full p-2 bg-white flex items-center 
            justify-center hover:opacity-75 transition'
          >
            <BiSearch className='text-black' size={20} />
          </button>
        </div>
        <div className='flex justify-between items-center gap-x-4'>
          <>
            <div>
              <Button
                className='bg-transparent text-neutral-300 font-medium'
                onClick={authModal.onOpen}
              >
                Sign Up
              </Button>
            </div>
            <div>
              <Button className='bg-white px-6 py-2' onClick={authModal.onOpen}>
                Log In
              </Button>
            </div>
          </>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
