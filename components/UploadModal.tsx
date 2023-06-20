'use client';

import { FieldValues, useForm } from 'react-hook-form';

import useUploadModal from '@/hooks/useUploadModal';

import Modal from './Modal';

const UploadModal = () => {
  const { isOpen, onClose } = useUploadModal();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };

  return (
    <Modal
      title='Add a Song'
      description='Upload an mp3 file'
      isOpen={isOpen}
      onChange={onChange}
    >
      Form
    </Modal>
  );
};

export default UploadModal;
