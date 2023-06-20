'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import useAuthModal from '@/hooks/useAuthModal';

import Modal from './Modal';

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  return (
    <Modal
      title='Welcome back'
      description='Login to your account'
      isOpen={isOpen}
      onChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
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
