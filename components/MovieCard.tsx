/* eslint-disable @next/next/no-img-element */
import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { MovieInterface } from '@/types';

interface MovieCardProps {
  data: MovieInterface;
  isMovieDetail?: boolean;
  posterDetailUrl?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ data, isMovieDetail, posterDetailUrl }) => {
  const router = useRouter();
  // const { openModal } = useInfoModalStore();

  const redirectToAlbum = useCallback(
    (movie: string) =>
      router.push({
        pathname: `/album`,
        query: movie,
      }),
    [router],
  );

  const redirectWatchMovie = useCallback((movie: any) => router.push(movie.link_embed), [router]);

  return (
    <div className="bg-zinc-900 col-span relative h-[12vw] mt-10">
      <img
        onClick={() => (isMovieDetail ? redirectWatchMovie(data) : redirectToAlbum(data as any))}
        src={
          isMovieDetail ? posterDetailUrl : `https://img.ophim9.cc/uploads/movies/${data.thumb_url}`
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
      <p className="text-white py-4">{isMovieDetail ? (data as any).filename : data.name}</p>
    </div>
  );
};

export default MovieCard;
