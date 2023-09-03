'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'react-hot-toast';
import uniqid from 'uniqid';

import { useUser } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModal';

import Modal from './Modal';
import Input from '../Input';
import Button from '../Button';

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const { isOpen, onClose } = useUploadModal();
  const { user } = useUser();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      artist: '',
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
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      // Exits if inputs are empty
      if (!imageFile || !songFile || !user) {
        toast.error('Missing fields');
        return;
      }

      const uploadandDocumentSong = async () => {
        const uniqueID = uniqid();

        // Upload Song
        const { data: songData, error: songError } =
          await supabaseClient.storage
            .from('songs')
            .upload(`song-${values.title}-${uniqueID}`, songFile, {
              cacheControl: '3600',
              upsert: false,
            });

        if (songError) {
          setIsLoading(false);
          return toast.error('Failed song upload');
        }

        // Upload Image once Song Upload is Successful
        const { data: imageData, error: imageError } =
          await supabaseClient.storage
            .from('images')
            .upload(`image-${values.title}-${uniqueID}`, imageFile, {
              cacheControl: '3600',
              upsert: false,
            });

        if (imageError) {
          setIsLoading(false);
          return toast.error('Failed image upload');
        }

        // Create record in table
        const { error: supabaseError, status: supabaseStatus } =
          await supabaseClient.from('songs').insert({
            user_id: user.id,
            title: values.title,
            artist: values.artist,
            image_path: imageData.path,
            song_path: songData.path,
          });

        if (supabaseError) {
          setIsLoading(false);
          return toast.error(supabaseError.message);
        }

        setIsLoading(false);

        reset();
        router.refresh();
      };

      toast.promise(uploadandDocumentSong(), {
        loading: 'Uploading...',
        success: <b>Song Created!</b>,
        error: <b>Upload Failed</b>,
      });

      onClose();
    } catch (_) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title='Add a Song'
      description='Upload a song file'
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
        <Input
          id='title'
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder='Song Title'
        />
        <Input
          id='artist'
          disabled={isLoading}
          {...register('artist', { required: true })}
          placeholder='Artist'
        />
        <div>
          <p className='pb-4 leading-4'>Select a song file</p>
          <Input
            id='song'
            type='file'
            disabled={isLoading}
            accept='.mp3'
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <p className='pb-4 leading-4'>Select an image</p>
          <Input
            id='image'
            type='file'
            disabled={isLoading}
            accept='image/*'
            {...register('image', { required: true })}
          />
        </div>
        <Button type='submit' disabled={isLoading} className='text-white'>
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
