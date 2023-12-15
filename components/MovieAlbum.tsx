/* eslint-disable @next/next/no-img-element */
import useMovieList from '@/hooks/useMovieList';
import { capitalizeFirstLetter } from '@/utils/utils';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

interface MovieAlbumProps {
  title: string;
}

const MovieAlbum: React.FC<MovieAlbumProps> = ({ title }) => {
  const { data: movieList = [] } = useMovieList();
  const router = useRouter();

  const redirectToAlbum = useCallback(
    (movie: string) =>
      router.push({
        pathname: `/album`,
        query: movie,
      }),
    [router],
  );
  
  return (
    <div className="px-4 md:px-16 py-20">
      <p className="text-white text-md md:text-xl lg:text-4xl font-semibold mb-4">
        {capitalizeFirstLetter(title)}
      </p>
      <div className="flex gap-10 mt-10 flex-wrap">
        {movieList.items != null ? movieList.items.map((movie: any) => {
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
        }) : null}
      </div>
    </div>
  );
};

export default MovieAlbum;
