import MovieAlbum from '@/components/MovieAlbum';
import { EGenreType } from '@/enum';
import useMovie from '@/hooks/useMovie';
import { MovieDetailInterface } from '@/types';
import React, { useMemo } from 'react';

const UpCommingScreen = () => {
  const { data: moviesData = [], isLoading } = useMovie();

  const filterSingleData = useMemo(
    () => moviesData.filter((data: MovieDetailInterface) => data.movie.type === EGenreType.SINGLE),
    [moviesData],
  );
  return (
    <section className="-mt-6 h-[60vh]">
    <MovieAlbum
      title={'Up Comming Movie'}
      moviesData={filterSingleData}
      isLoading={isLoading}
      itemsPerPage={6}
      isNavigate
    />
  </section>
  );
};

export default UpCommingScreen;
