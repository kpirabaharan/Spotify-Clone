import { create } from 'zustand';
import arrayShuffle from 'array-shuffle';

interface PlayerStore {
  ids: string[];
  unShuffledIds: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  setUnshuffledIds: (unShuffledIds: string[]) => void;
  reset: () => void;
  shuffle: (ids: string[]) => void;
  resetShuffle: (ids: string[]) => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  unShuffledIds: [],
  activeId: undefined,
  setId: (activeId: string) => set({ activeId }),
  setIds: (ids: string[]) => set({ ids }),
  setUnshuffledIds: (unShuffledIds: string[]) => set({ unShuffledIds }),
  reset: () => set({ ids: [], unShuffledIds: [], activeId: undefined }),
  shuffle: (ids: string[]) =>
    set({
      ids: arrayShuffle(ids),
    }),
  resetShuffle: (ids: string[]) =>
    set({
      ids,
    }),
}));

export default usePlayer;
