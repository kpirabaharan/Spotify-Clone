import { Song } from '@/types';

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem = ({ data, onClick }: MediaItemProps) => {
  return (
    <div>
      <p>{data.title}</p>
    </div>
  );
};

export default MediaItem;
