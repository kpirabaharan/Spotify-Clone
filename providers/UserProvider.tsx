'use client';

import { PropsWithChildren } from 'react';

import { MyUserContextProvider } from '@/hooks/useUser';

interface UserProviderProps extends PropsWithChildren {}

const UserProvider = ({ children }: UserProviderProps) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UserProvider;
9