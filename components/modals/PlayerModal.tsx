'use client';

import {
  Root,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Close,
} from '@radix-ui/react-dialog';
import { BsChevronDown } from 'react-icons/bs';

import usePlayerModal from '@/hooks/usePlayerModal';

const PlayerModal = () => {
  const { isOpen, onClose } = usePlayerModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Portal>
        <Overlay className='bg-neutral-900/90 backdrop-blur-sm fixed inset-0' />
        <Content
          className='fixed drop-shadow-md border border-neutral-700 top-[50%]
          left-[50%] max-h-full h-full md:h-auto md:max-h[85vh] w-full md:w-[90vw] 
          md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md 
          bg-neutral-800 p-[25px] focus:outline-none'
        >
          <div className='flex flex-col'>
            <div className='flex flex-row'>
              <Close asChild>
                <button>
                  <BsChevronDown size={20} />
                </button>
              </Close>
            </div>
          </div>
        </Content>
      </Portal>
    </Root>
  );
};

export default PlayerModal;
