import React, { Suspense, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { SwiperSlide, Swiper as SwiperContainer } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

import Billboard from '@/components/Billboard';
import MovieAlbum from '@/components/MovieAlbum';
import useMovie from '@/hooks/useMovie';
import Line from '@/components/Line';
import { MovieDetailInterface } from '@/types';
import { EGenreType } from '@/enum';
import Loading from './loading';
import MovieCard from '@/components/MovieCard';
import Image from 'next/image';

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
        <meta name="description" content="Phimhay - phimhd" />
      </Helmet>
      <Billboard />

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
