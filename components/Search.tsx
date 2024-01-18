import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/router';

interface SearchProps {
  isOpenSearch: () => void 
}

const Search: React.FC<SearchProps> = ({ isOpenSearch }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>('');

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, []);

  const handleSubmitSearch = useCallback(() => {
      router.push({
        pathname: '/moviesSearch',
        query: { keyword: searchValue },
      });
      isOpenSearch()
  }, [isOpenSearch, router, searchValue]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSubmitSearch();
      }
    },
    [handleSubmitSearch],
  );

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="max-w-md w-[50vw] h-[6vh] mx-auto z-10">
        <div className="relative w-full h-full rounded-lg focus-within:shadow-lg bg-white overflow-hidden z-10">
          <input
            className="h-full w-full outline-none text-sm text-gray-700 px-4"
            type="text"
            id="search"
            placeholder="Search film..."
            value={searchValue}
            onChange={handleChange}
            onKeyDown={onKeyDown}
          />
        </div>
        <div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full' onClick={isOpenSearch}/>
      </div>
    </div>
  );
};

export default Search;
