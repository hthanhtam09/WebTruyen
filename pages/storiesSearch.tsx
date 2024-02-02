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
  const { data: moviesData = [], isLoading } = useStories();
  const [moviesFilter, setMoviesFilter] = useState([]);
  const [currentMovie, setCurrentMovie] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [isShowSearch, setIsShowSearch] = useState<boolean>(false);

  const endOffset = itemOffset + itemsPerPage;

  useEffect(() => {
    if (moviesFilter.length > 0) {
      const currentItems = moviesFilter.slice(itemOffset, endOffset);
      setCurrentMovie(currentItems);
    }
  }, [endOffset, itemOffset, moviesFilter, setCurrentMovie]);

  const handlePaginationChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      const action = value > page ? 'next' : 'previous';
      const newPage = action === 'next' ? page + 1 : page - 1;

      setPage(newPage);
      const newOffset = (newPage - 1) * itemsPerPage;
      setItemOffset(newOffset);
    },
    [page],
  );

  useEffect(() => {
    (async () => {
      const normalizedKeyword = router.query.keyword
        ? slugify(router.query.keyword as string, { remove: /[-]/g, lower: true })
        : '';
      const resultFilter =
        moviesData.length > 0 &&
        moviesData.filter((movie: any) => {
          const normalizedSlug = slugify(movie.movie.slug, { remove: /[-]/g, lower: true });

          return normalizedSlug.includes(normalizedKeyword);
        });
      setMoviesFilter(resultFilter);
    })();
  }, [moviesData, router.query.keyword]);


  const isOpenSearch = useCallback(() => {
    setIsShowSearch((prev) => !prev);
  }, []);

  const navigateHomeScreen = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <>
      <Helmet>
        <title>Search</title>
      </Helmet>
      <div className="relative h-screen w-screen dark:bg-black bg-themeLight">
        {!isLoading ? (
          moviesFilter.length > 0 ? (
            <div className="absolute top-32 px-4 md:px-16">
              <StoriesList
                title={`Kết quả tìm kiếm: ${router.query.keyword}`}
                data={moviesFilter.length > itemsPerPage ? currentMovie : moviesFilter}
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
