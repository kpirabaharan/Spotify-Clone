'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { toast } from 'react-hot-toast';
import { BsIncognito } from 'react-icons/bs';

import useAuthModal from '@/hooks/useAuthModal';

import Modal from './Modal';

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const handleAnonLogin = async () => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: 'test@test.com',
      password: 'Password123',
    });

    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged In Anonymously');
    }
  };

  return (
    <Modal
      title='Welcome!'
      description='Login or Signup'
      isOpen={isOpen}
      onChange={onChange}
    >
      <div
        className='w-full flex flex-row justify-center items-center gap-x-2 
        bg-gradient-to-r from-slate-600 via-gray-500 to-slate-600
        py-[0.6rem] rounded-lg cursor-pointer'
        onClick={handleAnonLogin}
      >
        <BsIncognito className='text-black' />
        <p className='text-black text-base'>Sign in Anonymously (Demo)</p>
      </div>
      <Auth
        theme='dark'
        providers={['github']}
        magicLink
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          style: {
            button: {
              borderRadius: '10px',
              borderColor: 'rgba(0,0,0,0)',
            },
            input: {
              borderRadius: '10px',
              borderColor: 'rgba(0,0,0,0)',
            },
          },
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#334155',
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
