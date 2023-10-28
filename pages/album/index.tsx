/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import { useRouter } from 'next/router';

interface MovieAlbumScreenProps {
  title: string;
}

const MovieAlbumScreen: React.FC<MovieAlbumScreenProps> = ({}) => {
  const router = useRouter();
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();

  const movieData = movies.filter((ele: any) => ele.albumId === router.query.id);

  return (
    <>
      <Navbar />
      <div className="flex-col pt-32 px-4 md:px-16 py-6 flex items-start transition duration-500 bg-zinc-900 bg-opacity-90">
        <p className="text-white font-bold text-4xl">{router.query.title}</p>
        <div className="pt-12">
          <MovieList title="Trending Now" data={movieData} />
          {/* <MovieList title="My List" data={favorites} /> */}
        </div>
      </div>
    </>
  );
};

export default MovieAlbumScreen;
