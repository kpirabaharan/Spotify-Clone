import { PropsWithChildren } from 'react';
import {
  Root,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Close,
} from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
}

const Modal = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}: ModalProps) => {
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
          <Title className='text-xl text-center font-bold mb-4'>{title}</Title>
          <Description className='mb-5 text-sm leading-normal text-center'>
            {description}
          </Description>
          <div>{children}</div>
          <Close asChild>
            <button
              className='text-neutral-400 hover:text-white absolute 
              top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none
              items-center justify-center rounded-full focus:outline-none'
              onClick={() => {}}
            >
              <IoMdClose />
            </button>
          </Close>
        </Content>
      </Portal>
    </Root>
  );
};

export default Modal;
