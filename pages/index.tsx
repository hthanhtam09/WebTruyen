import React from 'react';
import Head from 'next/head';
import Script from 'next/script';

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
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4979943891567316"
        crossOrigin="anonymous"
      />
      <Billboard />
      <div className="pt-14">
        <MovieAlbum title={trans.home.trending} />
        {/* <MovieAlbum title={trans.home.series_movie} /> */}
      </div>
    </>
  );
};

export default Home;
