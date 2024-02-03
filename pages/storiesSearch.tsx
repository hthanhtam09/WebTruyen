import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import slugify from 'slugify';
import ReactPlayer from 'react-player';
import Image from 'next/image';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';

import StoriesList from '@/components/StoriesList';
import Search from '@/components/Search';
import Loading from '@/pages/loading';
import useStories from '@/hooks/useStories';

const itemsPerPage = 12;

const Content = styled.div`
  backdrop-filter: blur(2px);
  border-radius: 20px;
  box-shadow: 0 0.5px 0 1px rgba(255, 255, 255, 0.23) inset,
    0 1px 0 0 rgba(255, 255, 255, 0.66) inset, 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 10;
  padding: 32px;
  width: 30vw;
`;

const StoriesSearch = () => {
  const router = useRouter();
  const { data: StoriesData = [], isLoading } = useStories();
  const [storiesFilter, setStoriesFilter] = useState([]);
  const [currentStory, setCurrentStory] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [isShowSearch, setIsShowSearch] = useState<boolean>(false);

  const endOffset = itemOffset + itemsPerPage;

  useEffect(() => {
    if (storiesFilter.length > 0) {
      const currentItems = storiesFilter.slice(itemOffset, endOffset);
      setCurrentStory(currentItems);
    }
  }, [endOffset, itemOffset, storiesFilter, setCurrentStory]);

  useEffect(() => {
    (async () => {
      const normalizedKeyword = router.query.keyword
        ? slugify(router.query.keyword as string, { remove: /[-]/g, lower: true })
        : '';
      const resultFilter =
        StoriesData.length > 0 &&
        StoriesData.filter((story: any) => {
          const normalizedSlug = slugify(story.slug, { remove: /[-]/g, lower: true });

          return normalizedSlug.includes(normalizedKeyword);
        });
      setStoriesFilter(resultFilter);
    })();
  }, [StoriesData, router.query.keyword]);


  const isOpenSearch = useCallback(() => {
    setIsShowSearch((prev) => !prev);
  }, []);

  const navigateHomeScreen = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <>
     <Helmet prioritizeSeoTags>
        <title>Search</title>
        <meta name="description" content='Tìm kiếm WebTruyen' />
        {/* Các thẻ khác liên quan đến SEO */}
        <meta name="keywords" content="WebTruyen, Search" />
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
      <div className="relative h-screen w-screen dark:bg-black bg-themeLight">
        {!isLoading ? (
          storiesFilter.length > 0 ? (
            <div className="absolute top-32 px-4 md:px-16">
              <StoriesList
                title={`Kết quả tìm kiếm: ${router.query.keyword}`}
                data={storiesFilter.length > itemsPerPage ? currentStory : storiesFilter}
                style="mt-10 mb-20"
              />
            </div>
          ) : (
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <Content>
                <>
                  <p className="dark:text-white text-themeDark text-2xl font-bold text-center transition duration-500">
                    Oops!! No results were found: {router.query.keyword}
                  </p>
                  <p className="dark:text-white text-themeDark text-xl mt-2 text-center transition duration-500">
                    Please return to the home page or search for other movies.
                  </p>
                  <p className="dark:text-white text-themeDark text-xl mt-2 text-center transition duration-500">Cảm ơn!!!</p>
                </>
                <Image
                  src={'/images/gif/not-found.gif'}
                  alt="GIF"
                  width={200}
                  height={200}
                  style={{ width: 'auto', height: 'auto', display: 'block', margin: '0 auto' }}
                  priority={true}
                />
                <div className="flex justify-between items-center">
                  <div
                    className="relative inline-flex mt-4 cursor-pointer w-30"
                    onClick={navigateHomeScreen}
                  >
                    <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1" />
                    <div className="!mx-auto py-4 text-lg font-bold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 z-10">
                      <span className="dark:text-white text-themeDark capitalize transition duration-500">Home</span>
                    </div>
                  </div>
                  <div
                    className="relative inline-flex mt-4 cursor-pointer w-30"
                    onClick={isOpenSearch}
                  >
                    <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1" />
                    <div className="!mx-auto py-4 text-lg font-bold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 z-10">
                      <span className="dark:text-white text-themeDark capitalize transition duration-500">Search</span>
                    </div>
                  </div>
                </div>
              </Content>
            </div>
          )
        ) : (
          <div className="h-[100vh]">
            <Loading />
          </div>
        )}

        {isShowSearch && <Search isOpenSearch={isOpenSearch} />}
      </div>
    </>
  );
};

export default StoriesSearch;
