import LayoutHeader from '@/components/LayoutHeader';
import React, { useState } from 'react';
import Loading from '../loading';
import { useRouter } from 'next/router';
// import PlayButton from '@/components/PlayButton';
import MovieList from '@/components/MovieList';
import InfoModal from '@/components/InfoModal';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import MovieAlbum from '@/components/MovieAlbum';
import useTrans from '@/hooks/useTrans';
import Line from '@/components/Line';

const GenreScreen = () => {
  const trans = useTrans();

  return (
    <div className="pt-[93px] h-screen">
      {/* <LayoutHeader /> */}
      <div className="pb-40">
        <MovieAlbum title={trans.home.trending} itemsPerPage={12} isNavigate />
        <Line />
        <MovieAlbum title={trans.home.series_movie} itemsPerPage={12} isNavigate />
        <Line />
        <MovieAlbum title={trans.home.horror_movie} itemsPerPage={12} isNavigate />
        <Line />
      </div>
    </div>
  );
};

export default GenreScreen;
