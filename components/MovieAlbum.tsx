/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { capitalizeFirstLetter } from '@/utils/utils';
import useMovieList from '@/hooks/useMovieList';
import Loading from '@/pages/loading';

interface MovieAlbumProps {
  title: string;
}

const MovieAlbum: React.FC<MovieAlbumProps> = ({ title }) => {
  const [page, setPage] = useState(1);
  const { data: movieList = [], isLoading } = useMovieList(page);
  const router = useRouter();
  const classes = useStyles();

  const redirectToAlbum = useCallback(
    (movie: string) =>
      router.push({
        pathname: `/album`,
        query: movie,
      }),
    [router],
  );

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
       <div className='h-[100vh]'>
         <Loading />
        </div>
      ) : (
        <div className="flex gap-10 mt-10 flex-wrap">
          {movieList.items != null
            ? movieList.items.map((movie: any) => {
                return (
                  <div key={movie._id}>
                    <img
                      onClick={() => redirectToAlbum(movie)}
                      src={`https://img.ophim9.cc/uploads/movies/${movie.thumb_url}`}
                      alt="Movie"
                      draggable={false}
                      className="
                  cursor-pointer
                  object-cover
                  transition
                  duration
                  shadow-xl
                  rounded-md
                  group-hover:opacity-90
                  sm:group-hover:opacity-0
                  delay-300
                  w-[15vw]
                  h-[20vw]
              "
                    />
                    <p className="text-white pt-2  w-[15vw]">{movie.name}</p>
                  </div>
                );
              })
            : null}
        </div>
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
