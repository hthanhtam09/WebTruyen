import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import Billboard from '@/components/Billboard';
import MovieAlbum from '@/components/MovieAlbum';
import useTrans from '@/hooks/useTrans';
import Head from 'next/head';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Home = () => {
  const trans = useTrans();

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <title>CineShin</title>
      </Head>
      <Billboard />
      <div className="pb-40">
        <MovieAlbum title={trans.home.trending} />
        <MovieAlbum title={trans.home.series_movie} />
      </div>
    </>
  );
};

export default Home;
