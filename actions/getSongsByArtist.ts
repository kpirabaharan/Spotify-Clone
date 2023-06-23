import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Song } from '@/types';

const getSongsByArtist = async (artist: String): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  if (!artist) {
    return [];
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .ilike('artist', `%${artist}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSongsByArtist;
