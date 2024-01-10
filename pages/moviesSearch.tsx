import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import slugify from 'slugify';
import ReactPlayer from 'react-player';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Image from 'next/image';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';

import MovieList from '@/components/MovieList';
import Search from '@/components/Search';
import moviesJson from '@/movies.json';
import Loading from '@/pages/loading';
import useMovie from '@/hooks/useMovie';

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

const MoviesSearch = () => {
  const router = useRouter();
  const classes = useStyles();
  const { data: moviesData = [], isLoading } = useMovie();
  const [moviesFilter, setMoviesFilter] = useState([]);
  const [currentMovie, setCurrentMovie] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [isShowSearch, setIsShowSearch] = useState<boolean>(false);

  const randomMoviesIndex = Math.floor(Math.random() * moviesJson.length);
  const pageCount = Math.ceil(moviesFilter.length / itemsPerPage);
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

  const VideoBackground = useMemo(() => {
    return (
      <ReactPlayer
        className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none w-full brightness-[60%] object-cover h-full"
        url={`${moviesJson[randomMoviesIndex].videoUrl}`}
        width="100%"
        height="100%"
        playing
        controls={false}
        muted
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className="relative h-screen w-screen bg-black">
        {VideoBackground}
        {!isLoading ? (
          moviesFilter.length > 0 ? (
            <div className="absolute top-32 px-4 md:px-16">
              <MovieList
                title={`Kết quả tìm kiếm: ${router.query.keyword}`}
                data={moviesFilter.length > itemsPerPage ? currentMovie : moviesFilter}
                style="mt-10 mb-20"
              />
              {moviesFilter.length > itemsPerPage ? (
                <div className="w-full pt-14 flex justify-center">
                  <Pagination
                    count={pageCount}
                    variant="outlined"
                    color="primary"
                    page={page}
                    size="large"
                    onChange={handlePaginationChange}
                    className={classes.paginationItem}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <Content>
                <>
                  <p className="text-white text-2xl font-bold text-center">
                    Oops!! Không có kết quả: {router.query.keyword}
                  </p>
                  <p className="text-white text-xl mt-2 text-center">
                    Vui lòng trở về trang chủ hoặc tìm kiếm phim khác.
                  </p>
                  <p className="text-white text-xl mt-2 text-center">Cảm ơn!!!</p>
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
                      <span className="text-white capitalize">Trang chủ</span>
                    </div>
                  </div>
                  <div
                    className="relative inline-flex mt-4 cursor-pointer w-30"
                    onClick={isOpenSearch}
                  >
                    <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1" />
                    <div className="!mx-auto py-4 text-lg font-bold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 z-10">
                      <span className="text-white capitalize">Tìm kiếm</span>
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

export default MoviesSearch;

const useStyles = makeStyles({
  paginationItem: {
    '&.MuiPagination-root .MuiPagination-ul li > button': {
      color: '#fff',
    },
  },
});
