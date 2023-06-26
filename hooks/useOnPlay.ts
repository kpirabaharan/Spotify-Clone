import { Song } from '@/types';

import { useUser } from './useUser';
import usePlayer from './usePlayer';
import useAuthModal from './useAuthModal';
import useSubscribeModal from './useSubscribeModal';

const useOnPlay = (songs: Song[]) => {
  const { setId, setIds } = usePlayer();
  const authModal = useAuthModal();
  const subscribeModal = useSubscribeModal();
  const { user, subscription } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    setId(id);
    setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
