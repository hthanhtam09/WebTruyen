
import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { MovieDetailInterface } from '@/types';

interface MovieCardProps {
  data: MovieDetailInterface;
  isMovieDetail?: boolean;
  posterDetailUrl?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ data, isMovieDetail, posterDetailUrl }) => {
  const router = useRouter();

  const redirectToAlbum = useCallback(
    (data: MovieDetailInterface) =>
      router.push({
        pathname: `/album`,
        query: data.movie?.slug,
      }),
    [router],
  );

  const redirectWatchMovie = useCallback((movie: any) => router.push(movie.link_embed), [router]);

  return data ? (
    <div className="relative mt-10">
      <img
        onClick={() => (isMovieDetail ? redirectWatchMovie(data) : redirectToAlbum(data))}
        src={
          isMovieDetail ? posterDetailUrl : data.movie?.poster_url
        }
        alt="Movie"
        draggable={false}
        className="
          cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-md
          w-full
          h-[12vw]
          hover:opacity-30
        "
      />
      <p className="text-white py-4 text-sm">{isMovieDetail ? (data as any).filename : data.movie?.name}</p>
    </div>
  ) : null;
};

export default MovieCard;
