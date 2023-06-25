import getSongsByTitle from '@/actions/getSongsByTitle';

import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import SearchContent from './components/SearchContent';
import getSongsByArtist from '@/actions/getSongsByArtist';

export const revalidate = 0;

interface SearchProps {
  searchParams: {
    query: string;
  };
}

const Search = async ({ searchParams }: SearchProps) => {
  const songsByTitle = await getSongsByTitle(searchParams.query);
  const songsByArtist = await getSongsByArtist(searchParams.query);

  const songs = songsByTitle.concat(songsByArtist);

  return (
    <div
      className='bg-neutral-900 rounded-lg h-full md:mr-2 overflow-hidden 
      overflow-y-auto'
    >
      <Header className='from-bg-neutral-900'>
        <div className='mb-2 flex flex-col gap-y-6'>
          <h1 className='text-white text-3xl font-semibold'>Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;
