'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useUploadModal from '@/hooks/useUploadModal';

import Modal from './Modal';
import Input from './Input';

const UploadModal = () => {
  const { isOpen, onClose } = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // TODO: Upload to Supabase
  };

  return (
    <Modal
      title='Add a Song'
      description='Upload a song file'
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id='title'
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder='Song Title'
        />
      </form>
    </Modal>
  );
};

export default UploadModal;
