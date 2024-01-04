import React, { useCallback, useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { capitalizeFirstLetter } from '@/utils/utils';
import Loading from '@/pages/loading';
import MovieList from './MovieList';
import useMoviesData from '@/hooks/useMoviesData';
import { useRouter } from 'next/router';

interface MovieAlbumProps {
  title: string;
  itemsPerPage?: number;
  isPagination?: boolean;
  isNavigate?: boolean;
}

const MovieAlbum: React.FC<MovieAlbumProps> = ({
  title,
  itemsPerPage = 24,
  isPagination = false,
  isNavigate = false,
}) => {
  const { data: moviesData = [], isLoading } = useMoviesData();
  const router = useRouter();
  const classes = useStyles();

  const [page, setPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentMovie, setCurrentMovie] = useState([]);

  const pageCount = Math.ceil(moviesData.length / itemsPerPage);
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

  const redirectToNameGenreScreen = useCallback(
    () =>
      router.push({
        pathname: `/genre/${title}`,
      }),
    [router, title],
  );

  useEffect(() => {
    if (moviesData.length > 0) {
      const currentItems = moviesData.slice(itemOffset, endOffset);
      setCurrentMovie(currentItems);
    }
  }, [endOffset, itemOffset, moviesData, setCurrentMovie]);

  return (
    <div className="h-full relative px-4 md:px-16 pt-20 pb-10">
      <div onClick={() => (isNavigate ? redirectToNameGenreScreen() : {})} className='flex items-center cursor-pointer'>
        <p className="text-white text-md md:text-xl lg:text-4xl font-semibold mb-4">
          {capitalizeFirstLetter(title)}
        </p>
        {isNavigate && (
          <img
            className="w-[30px] h-[30px] ml-6"
            src="/images/right-arrow-icon.png"
            alt="icon"
          />
        )}
      </div>

      {!isLoading ? (
        currentMovie.length > 0 ? (
          <>
            <MovieList data={currentMovie} style="mt-10 mb-20" />
            {isPagination && (
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
