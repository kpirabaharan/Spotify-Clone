'use client';

import { useUser } from '@/hooks/useUser';

const Welcome = () => {
  const { user } = useUser();

  if (!user) {
    return <h1 className='text-white text-3xl font-semibold'>Welcome</h1>;
  }

  return <h1 className='text-white text-3xl font-semibold'>Welcome Back</h1>;
};

export default Welcome;
