'use client';

import { useRouter } from 'next/navigation';
import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import Modal from './Modal';
import useAuthModal from '@/hooks/useAuthModal';

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

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
          variables: {
            default: {
              colors: {
                brand: '#334155',
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
