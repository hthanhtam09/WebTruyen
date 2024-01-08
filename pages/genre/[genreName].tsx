import React from 'react';
import { useRouter } from 'next/router';
import MovieAlbum from '@/components/MovieAlbum';
import useMovie from '@/hooks/useMovie';

const GenreNameScreen = ({ isLoading = false }: any) => {
  const router = useRouter();
  const moviesData = JSON.parse(router.query.movies as any);

  return (
    <div className="pt-[50px] h-screen">
      <div className="pb-40">
        <MovieAlbum
          title={router.query.genreName as string}
          moviesData={moviesData}
          isLoading={isLoading}
          itemsPerPage={24}
          isPagination
        />
      </div>
    </div>
  );
};

export default GenreNameScreen;
