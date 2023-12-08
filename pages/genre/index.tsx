import FilterFilm from '@/components/FilterFilm';
import LayoutHeader from '@/components/LayoutHeader';
import useMovieList from '@/hooks/useMovieList';
import React, { useState } from 'react';
import Loading from '../loading';
import { useRouter } from 'next/router';
// import PlayButton from '@/components/PlayButton';
import MovieList from '@/components/MovieList';
import InfoModal from '@/components/InfoModal';
import useInfoModalStore from '@/hooks/useInfoModalStore';

const GenreScreen = () => {
  const [sortValue, setSortValue] = useState('newest');
  const [genreValue, setGenreValue] = useState('action');
  const [countryValue, setCountryValue] = useState('us');

  const { data: movies = [], isLoading } = useMovieList();
  const router = useRouter();
  const { isOpen, closeModal } = useInfoModalStore();

  const handleSortChange = (value: string) => {
    setSortValue(value);
    // Xử lý khi giá trị sắp xếp thay đổi
  };

  const handleGenreChange = (value: string) => {
    setGenreValue(value);
    // Xử lý khi giá trị thể loại thay đổi
  };

  const handleCountryChange = (value: string) => {
    setCountryValue(value);
    // Xử lý khi giá trị quốc gia thay đổi
  };
  return (
    <div className="pt-[93px]">
      <LayoutHeader />
      <div className="pb-40">
        <FilterFilm
          onSortChange={handleSortChange}
          onGenreChange={handleGenreChange}
          onCountryChange={handleCountryChange}
        />

        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="flex-col px-4 md:px-16 py-6 flex items-start transition duration-500 bg-zinc-900 bg-opacity-90">
              <MovieList title="" data={movies} style="mt-10" />
            </div>
            <InfoModal visible={isOpen} onClose={closeModal} />
          </>
        )}
      </div>
    </div>
  );
};

export default GenreScreen;
