/* eslint-disable @next/next/no-img-element */
import useMovieAlbum from '@/hooks/useMovieAlbum';
import useTrans from '@/hooks/useTrans';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

const MovieAlbum = () => {
  const { data: movieAlbum = [] } = useMovieAlbum();
  const router = useRouter();
  const trans = useTrans();

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
        {trans.home.Trending}
      </p>
      <div className="flex gap-10 mt-10">
        {Object.values(movieAlbum).map((movie: any) => (
          <div key={movie.id}>
            <img
              onClick={() => redirectToAlbum(movie)}
              src={movie.thumbnailUrl}
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
            <p className="text-white pt-2">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieAlbum;
