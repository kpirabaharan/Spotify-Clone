import './globals.css';
import { Figtree } from 'next/font/google';

import getSongsByUserId from '@/actions/getSongsByUserId';
import SupabaseProvider from '@/providers/SupabaseProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';

import Sidebar from '@/components/Sidebar';
import Player from '@/components/Player';

const font = Figtree({ subsets: ['latin'] });

export const metadata = {
  title: 'Spotify Clone',
  description: 'Listen to Music',
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();

  return (
    <html lang='en'>
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
