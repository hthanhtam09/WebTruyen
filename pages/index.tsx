import React from 'react';
import Head from 'next/head';

import Billboard from '@/components/Billboard';
import MovieAlbum from '@/components/MovieAlbum';
import useTrans from '@/hooks/useTrans';

const Home = () => {
  const trans = useTrans();

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <title>CineShin</title>
      </Head>

      <Billboard />
      <div className="pt-14 h-[165vh]" id="moveTrending">
        <MovieAlbum title={trans.home.trending} isPagination/>
      </div>
    </>
  );
};

export default Home;
