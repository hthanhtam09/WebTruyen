import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';

import Billboard from '@/components/Billboard';
import StoryAlbum from '@/components/StoryAlbum';
import useStories from '@/hooks/useStories';
import Line from '@/components/Line';
import { StoriesInterface } from '@/types';
import { EGenreType } from '@/enum';


const Home = () => {
  const { data: storiesData = [], isLoading } = useStories();

  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>Trang chủ</title>
        <meta name="description" content="WebTruyen - Trang chủ" />
      </Helmet>
      {/* <Billboard /> */}

      <section className="mt-16 h-[80vh]" id="moveStories">
        <StoryAlbum
          title={'Stories'}
          storiesData={storiesData}
          isLoading={isLoading}
          itemsPerPage={6}
          isNavigate
        />
      </section>
      <Line />
      <section className="mt-6 h-[80vh]" id="moveStories">
        <StoryAlbum
          title={'Stories'}
          storiesData={storiesData}
          isLoading={isLoading}
          itemsPerPage={6}
          isNavigate
        />
      </section>
    </>
  );
};

export default Home;
