import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

import Billboard from '@/components/Billboard';
import MovieAlbum from '@/components/MovieAlbum';
import useMovie from '@/hooks/useMovie';
import Line from '@/components/Line';
import { MovieDetailInterface } from '@/types';
import { EGenreType } from '@/enum';
import LineImage from '@/components/LineImage';
import ReactPlayer from 'react-player';

const Home = () => {
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
    <>
      <Helmet prioritizeSeoTags>
        <title>Home</title>
      </Helmet>

      <Billboard />
      {/* <div className={`pt-14 ${isLoading && 'h-[100vh]'}`} id="moveTrending">
        <MovieAlbum
          title={trans.home.recommened_for_you}
          moviesData={moviesData}
          isLoading={isLoading}
          itemsPerPage={24}
          isPagination
        />
      </div> */}
      <section className="mt-16 h-[60vh]" id="moveMovies">
        <MovieAlbum
          title={'Series Movie'}
          moviesData={filterSeriesData}
          isLoading={isLoading}
          itemsPerPage={6}
          isNavigate
        />
      </section>
      <Line />
      <section className="-mt-6 h-[60vh]">
        <MovieAlbum
          title={'Single Movie'}
          moviesData={filterSingleData}
          isLoading={isLoading}
          itemsPerPage={6}
          isNavigate
        />
      </section>
      <Line />
      <section className="h-[60vh]">
        <MovieAlbum
          title={'Popular Movie'}
          moviesData={filterSingleData}
          isLoading={isLoading}
          itemsPerPage={6}
          isNavigate
        />
      </section>
      <Line />
      <section className="-mt-6 h-[60vh] mb-16">
        <MovieAlbum
          title={'Most View Movie'}
          moviesData={filterSingleData}
          isLoading={isLoading}
          itemsPerPage={6}
          isNavigate
        />
      </section>
    </>
  );
};

export default Home;
