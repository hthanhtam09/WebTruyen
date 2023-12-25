/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { capitalizeFirstLetter } from '@/utils/utils';
import useMovieList from '@/hooks/useMovieList';
import Loading from '@/pages/loading';
import MovieList from './MovieList';

interface MovieAlbumProps {
  title: string;
}

const MovieAlbum: React.FC<MovieAlbumProps> = ({ title }) => {
  const [page, setPage] = useState(1);
  const { data: movieList = [], isLoading } = useMovieList(page);
  const router = useRouter();
  const classes = useStyles();

  const handlePaginationChange = useCallback(
    (_: any, value: number) => {
      setPage(value);
      router.push(`/?page=${value}`, undefined, { shallow: true });
    },
    [router],
  );

  return (
    <div className="px-4 md:px-16 py-20">
      <p className="text-white text-md md:text-xl lg:text-4xl font-semibold mb-4">
        {capitalizeFirstLetter(title)}
      </p>
      {isLoading ? (
        <div className="h-[100vh]">
          <Loading />
        </div>
      ) : (
        <>
          {movieList.items != null ? (
            <div className="flex py-6 transition duration-500 bg-zinc-900 bg-opacity-90">
              <MovieList
                data={movieList.items}
                style="mt-10 mb-20"
              />
            </div>
          ) : (
            <Loading />
          )}
        </>
      )}

      <div className="w-full mt-10 flex justify-center">
        <Pagination
          count={movieList?.pagination?.totalPages}
          variant="outlined"
          color="primary"
          page={page}
          size="large"
          onChange={handlePaginationChange}
          className={classes.paginationItem}
        />
      </div>
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
