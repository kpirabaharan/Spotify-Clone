'use client';

import { useEffect, useState } from 'react';

import AuthModal from '@/components/modals/AuthModal';
import UploadModal from '@/components/modals/UploadModal';
import PlayerModal from '@/components/modals/PlayerModal';
import SubscribeModal from '@/components/modals/SubscribeModal';
import { ProductWithPrice } from '@/types';

interface ModalProviderProps {
  products: ProductWithPrice[];
}

const ModalProvider = ({ products }: ModalProviderProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
      <PlayerModal/>
      <SubscribeModal products={products} />
    </>
  );
};

export default ModalProvider;
