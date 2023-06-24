'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';

import useDebounce from '@/hooks/useDebounce';

import Input from './Input';

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const query = { query: debouncedValue };

    const url = qs.stringifyUrl({ url: '/search', query: query });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      placeholder='Search for a song by name or artist'
      value={value}
      onChange={(val) => setValue(val.target.value)}
    />
  );
};

export default SearchInput;
