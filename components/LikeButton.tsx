'use client';

import { useState, useEffect, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { toast } from 'react-hot-toast';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

interface LikeButtonProps {
  songId: string;
  iconSize?: number;
}

const LikeButton = ({ songId, iconSize = 25 }: LikeButtonProps) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();
  const { onOpen } = useAuthModal();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async (e: MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      return onOpen();
    }

    // Unlike
    if (isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient.from('liked_songs').insert({
        user_id: user.id,
        song_id: songId,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success('Liked!', { id: 'like' });
      }
    }

    router.refresh();
  };

  return (
    <button className='hover:opacity-75 transition' onClick={handleLike}>
      <Icon color={isLiked ? '#303d4f' : 'white'} size={iconSize} />
    </button>
  );
};

export default LikeButton;
