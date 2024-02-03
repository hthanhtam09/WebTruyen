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
        <title>Home</title>
        <meta name="description" content='Trang chủ WebTruyen' />
        {/* Các thẻ khác liên quan đến SEO */}
        <meta name="keywords" content="WebTruyen, Home" />
        <meta name="author" content="WebTruyen" />
        {/* Các thẻ Open Graph */}
        <meta property="og:title" content='WebTruyen' />
        <meta property="og:description" content='Khám phá thế giới truyện tuyệt vời tại WebTruyen - Nơi quy tụ hàng nghìn bộ truyện đa dạng và độc đáo. Tận hưởng trải nghiệm xem truyện tuyệt vời nhờ vào thư viện đa dạng của chúng tôi, nơi mỗi bộ truyện là một hành trình đặc sắc đầy ấn tượng. Hãy thưởng thức niềm đam mê điện ảnh tại WebTruyen, nơi mang đến cho bạn trải nghiệm xem truyện đỉnh cao và đa chiều.' />
        <meta property="og:image" content='WebTruyen' />
        <meta property="og:url" content='WebTruyen' />
        {/* Các thẻ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content='WebTruyen' />
        <meta name="twitter:description" content='Khám phá thế giới truyện tuyệt vời tại WebTruyen - Nơi quy tụ hàng nghìn bộ truyện đa dạng và độc đáo. Tận hưởng trải nghiệm xem truyện tuyệt vời nhờ vào thư viện đa dạng của chúng tôi, nơi mỗi bộ truyện là một hành trình đặc sắc đầy ấn tượng. Hãy thưởng thức niềm đam mê điện ảnh tại WebTruyen, nơi mang đến cho bạn trải nghiệm xem truyện đỉnh cao và đa chiều.' />
        <meta name="twitter:image" content='WebTruyen' />
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
