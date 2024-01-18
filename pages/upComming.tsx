import Line from '@/components/Line';
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
    <div className='py-20'>
      <section className="h-[60vh]">
        <MovieAlbum
          title={'Movie Theaters'}
          moviesData={filterSingleData}
          isLoading={isLoading}
          itemsPerPage={6}
          isNavigate
        />
      </section>
      <Line />
      <section className="h-[60vh]">
        <MovieAlbum
          title={'Movie Horror'}
          moviesData={filterSingleData}
          isLoading={isLoading}
          itemsPerPage={6}
          isNavigate
        />
      </section>
    </div>
  );
};

export default UpCommingScreen;
