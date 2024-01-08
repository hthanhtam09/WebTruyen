import React, { useMemo } from 'react';
import MovieAlbum from '@/components/MovieAlbum';
import useTrans from '@/hooks/useTrans';
import Line from '@/components/Line';
import useMovie from '@/hooks/useMovie';
import { MovieDetailInterface } from '@/types';
import { EGenreType } from '@/enum';

const GenreScreen = () => {
  const trans = useTrans();
  const { data: moviesData = [], isLoading } = useMovie();

  const filterSeriesData = useMemo(
    () => moviesData.filter((data: MovieDetailInterface) => data.movie.type === EGenreType.SERIES),
    [moviesData],
  );

  const filterSingleData = useMemo(
    () => moviesData.filter((data: MovieDetailInterface) => data.movie.type === EGenreType.SINGLE),
    [moviesData],
  );

  return (
    <div className="pt-[93px] pb-16">
      {/* <LayoutHeader /> */}
      <section className="h-[90vh]">
        <MovieAlbum
          title={trans.home.series_movie}
          moviesData={filterSeriesData}
          isLoading={isLoading}
          itemsPerPage={12}
          isNavigate
        />
      </section>
      <Line />
      <section className="h-[90vh]">
        <MovieAlbum
          title={trans.home.single_movie}
          moviesData={filterSingleData}
          isLoading={isLoading}
          itemsPerPage={12}
          isNavigate
        />
      </section>
    </div>
  );
};

export default GenreScreen;
