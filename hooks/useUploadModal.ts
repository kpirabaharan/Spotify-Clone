import { create } from 'zustand';

interface UploadModalStore {
  isOpen: boolean;
  isLogin: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUploadModal = create<UploadModalStore>((set) => ({
  isOpen: false,
  isLogin: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUploadModal;
