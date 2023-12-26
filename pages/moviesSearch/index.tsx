import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Loading from '../loading';
import useMoviesData from '@/hooks/useMoviesData';
import slugify from 'slugify';
import MovieList from '@/components/MovieList';
import moviesJson from '@/movies.json';
import ReactPlayer from 'react-player';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const itemsPerPage = 12;

const MoviesSearch = () => {
  const router = useRouter();
  const { data: moviesData = [], isLoading } = useMoviesData();
  const [moviesFilter, setMoviesFilter] = useState([]);
  const [currentMovie, setCurrentMovie] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [page, setPage] = useState(1);
  const classes = useStyles();

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
          const normalizedSlug = slugify(movie.slug, { remove: /[-]/g, lower: true });

          return normalizedSlug.includes(normalizedKeyword);
        });
      setMoviesFilter(resultFilter);
    })();
  }, [moviesData, router.query.keyword]);

  const VideoBackground = useMemo(() => {
    return <ReactPlayer
    className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none w-full brightness-[60%] object-cover h-full"
    url={`${moviesJson[randomMoviesIndex].videoUrl}`}
    width="100%"
    height="100%"
    playing
    controls={false}
    muted
  />
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
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
          <div className="bg-white">
            <p>Không có kết quả</p>
          </div>
        )
      ) : (
        <div className="h-[100vh]">
          <Loading />
        </div>
      )}
    </div>
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
