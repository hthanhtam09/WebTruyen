import React from 'react';
import Head from 'next/head';

import Billboard from '@/components/Billboard';
import MovieAlbum from '@/components/MovieAlbum';
import useTrans from '@/hooks/useTrans';
import useMovie from '@/hooks/useMovie';

const Home = () => {
  const trans = useTrans();
  const { data: moviesData = [], isLoading } = useMovie();

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <title>CineShin</title>
      </Head>

      <Billboard />
      <div className="pt-14 h-[165vh]" id="moveTrending">
        <MovieAlbum
          title={trans.home.trending}
          moviesData={moviesData}
          isLoading={isLoading}
          itemsPerPage={24}
          isPagination
        />
      </div>
    </>
  );
};

export default Home;
