import React from 'react';
import { useRouter } from 'next/router';
import MovieAlbum from '@/components/MovieAlbum';

const MoviesListNameScreen = ({ isLoading = false }: any) => {
  const router = useRouter();
  const moviesData = router.query.movies && JSON.parse(router.query.movies as any);

  return (
    <div className="pt-[50px]">
      <MovieAlbum
        title={router.query.title as string}
        moviesData={moviesData}
        isLoading={isLoading}
        itemsPerPage={24}
        isPagination
      />
    </div>
  );
};

export default MoviesListNameScreen;
