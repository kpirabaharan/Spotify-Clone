import { create } from 'zustand';

interface PlayerModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePlayerModal = create<PlayerModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePlayerModal;
