import React, { useCallback, useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '@/pages/loading';
import MovieList from './MovieList';
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';
import { MovieDetailInterface } from '@/types';

interface MovieAlbumProps {
  title: string;
  moviesData: MovieDetailInterface[];
  isLoading: boolean;
  itemsPerPage?: number;
  isPagination?: boolean;
  isNavigate?: boolean;
}

const MovieAlbum: React.FC<MovieAlbumProps> = ({
  title,
  moviesData,
  isLoading,
  itemsPerPage = 24,
  isPagination = false,
  isNavigate = false,
}) => {
  const router = useRouter();
  const classes = useStyles();

  const [page, setPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentMovie, setCurrentMovie] = useState<MovieDetailInterface[]>([]);

  const pageCount =
    moviesData != null && moviesData.length > 0 ? Math.ceil(moviesData.length / itemsPerPage) : 1;
  const endOffset = itemOffset + itemsPerPage;

  const handlePaginationChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      const action = value > page ? 'next' : 'previous';
      const newPage = action === 'next' ? page + 1 : page - 1;

      setPage(newPage);
      const newOffset = (newPage - 1) * itemsPerPage;
      setItemOffset(newOffset);
    },
    [itemsPerPage, page],
  );

  const redirectToMoviesListNameScreen = useCallback(
    (currentMovie: MovieDetailInterface[]) => {
      const queryObject = {
        movies: JSON.stringify(currentMovie),
      };
      router.push({
        pathname: `/${title}`,
        query: queryObject,
      });
    },
    [router, title],
  );

  useEffect(() => {
    if (moviesData && moviesData.length > 0) {
      const currentItems = moviesData.slice(itemOffset, endOffset);
      setCurrentMovie(currentItems);
    }
  }, [endOffset, itemOffset, moviesData, setCurrentMovie]);

  return (
    <div className="h-full relative px-4 md:px-16 pt-20 pb-10">
      <div className="flex items-center justify-between">
        <p className="dark:text-white text-themeDark text-md md:text-xl lg:text-4xl font-semibold transition duration-500">
          {title}
        </p>
        {isNavigate && (
          <div
            onClick={() => redirectToMoviesListNameScreen(moviesData)}
            className="flex dark:text-white text-themeDark items-center cursor-pointer transition duration-500"
          >
            View all
            <img className="w-[30px] h-[30px] ml-2" src="/images/right-arrow-icon.png" alt="icon" />
          </div>
        )}
      </div>

      {!isLoading ? (
        currentMovie.length > 0 ? (
          <>
            <MovieList data={currentMovie} style="mt-10 mb-10" />
            {isPagination && (
              <div className="w-full flex justify-center">
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
            )}
          </>
        ) : null
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default MovieAlbum;

const useStyles = makeStyles({
  paginationItem: {
    '&.MuiPagination-root .MuiPagination-ul li > button': {
      color: '#fff',
    },
  },
});
