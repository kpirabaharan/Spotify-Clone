'use client';

import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import usePlayer from '@/hooks/usePlayer';

import Button from './Button';

interface HeaderProps extends PropsWithChildren {
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged Out');
    }
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
          <Link href={'/'}>
            <button
              className='rounded-full p-2 bg-white flex items-center 
            justify-center hover:opacity-75 transition'
            >
              <HiHome className='text-black' size={20} />
            </button>
          </Link>
          <Link href={'/search'}>
            <button
              className='rounded-full p-2 bg-white flex items-center 
            justify-center hover:opacity-75 transition'
            >
              <BiSearch className='text-black' size={20} />
            </button>
          </Link>
        </div>
        <div className='flex justify-between items-center gap-x-4'>
          {user ? (
            <div className='flex gap-x-4 items-center'>
              <Button className='bg-white px-6py-2' onClick={handleLogout}>
                Logout
              </Button>
              <Button
                onClick={() => router.push('/account')}
                className='bg-white'
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
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
                <Button
                  className='bg-white px-6 py-2'
                  onClick={authModal.onOpen}
                >
                  Log In
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
