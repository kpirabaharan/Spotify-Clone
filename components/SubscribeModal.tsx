'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { ProductWithPrice, Price } from '@/types';
import { useUser } from '@/hooks/useUser';
import useSubscribeModal from '@/hooks/useSubscribeModal';
import { postData } from '@/libs/helpers';
import { getStripe } from '@/libs/stripeClient';

import Modal from './Modal';
import Button from './Button';

interface SubscribeModalProps {
  products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);
};

const SubscribeModal = ({ products }: SubscribeModalProps) => {
  const { user, isLoading, subscription } = useUser();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const { isOpen, onClose } = useSubscribeModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error('Must be logged in');
    }

    if (subscription) {
      setPriceIdLoading(undefined);
      return toast('Already subscribed');
    }

    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price },
      });

      console.log({ log: sessionId });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (err: any) {
      toast.error((err as Error).message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  let content = <div className='text-center'>No products available</div>;

  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No prices available</div>;
          }
          return product.prices.map((price) => (
            <Button
              key={price.id}
              className='mb-4'
              onClick={() => handleCheckout(price)}
              disabled={isLoading || price.id === priceIdLoading}
            >
              <p>{`Subscribe for a ${product.description}`}</p>
              <p className='text-lg font-bold'>{` ${formatPrice(price)}/mo`}</p>
            </Button>
          ));
        })}
      </div>
    );
  }

  if (subscription) {
    content = <div className='text-center'>Already subscribed</div>;
  }

  return (
    <Modal
      title='Only for premium users'
      description='Listen to music with Spotify Premium'
      isOpen={isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
};

export default SubscribeModal;
