import './globals.css';
import { Figtree } from 'next/font/google';

import SupabaseProvider from '@/providers/SupabaseProvider';
import Sidebar from '@/components/Sidebar';
import UserProvider from '@/providers/UserProvider';
import { PropsWithChildren } from 'react';

const font = Figtree({ subsets: ['latin'] });

export const metadata = {
  title: 'Spotify Clone',
  description: 'Listen to Music',
};

// interface RootLayoutProps extends PropsWithChildren {}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <SupabaseProvider>
          <UserProvider>
            <Sidebar>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
