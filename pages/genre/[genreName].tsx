import React from 'react';
import { useRouter } from 'next/router';
import MovieAlbum from '@/components/MovieAlbum';

const GenreNameScreen = () => {
  const router = useRouter();

  return (
    <div className="pt-[50px] h-screen">
      {/* <LayoutHeader /> */}
      <div className="pb-40">
        <MovieAlbum title={router.query.genreName as string} isPagination />
      </div>
    </div>
  );
};

export default GenreNameScreen;
