/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { capitalizeFirstLetter } from '@/utils/utils';
import Loading from '@/pages/loading';
import MovieList from './MovieList';
import useMoviesData from '@/hooks/useMoviesData';

const itemsPerPage = 24;

interface MovieAlbumProps {
  title: string;
}

const MovieAlbum: React.FC<MovieAlbumProps> = ({ title }) => {
  const { data: moviesData = [], isLoading } = useMoviesData();

  const [page, setPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentMovie, setCurrentMovie] = useState([]);

  const pageCount = Math.ceil(moviesData.length / itemsPerPage);
  const endOffset = itemOffset + itemsPerPage;
  const classes = useStyles();

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
    if (moviesData.length > 0) {
      const currentItems = moviesData.slice(itemOffset, endOffset);
      setCurrentMovie(currentItems);
    }
  }, [endOffset, itemOffset, moviesData, setCurrentMovie]);

  return (
    <div className="px-4 md:px-16 py-20">
      <p className="text-white text-md md:text-xl lg:text-4xl font-semibold mb-4">
        {capitalizeFirstLetter(title)}
      </p>
      {!isLoading && moviesData.length > 0 ? (
        <>
          <MovieList
            data={currentMovie}
            style="mt-10 mb-20"
          />
          {moviesData.length > itemsPerPage ? (
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
        </>
      ) : (
        <div className="h-[100vh]">
          <Loading />
        </div>
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
