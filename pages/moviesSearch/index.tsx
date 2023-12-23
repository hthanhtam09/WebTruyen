import React from 'react';
import { useRouter } from 'next/router';
import Loading from '../loading';
import useMoviesData from '@/hooks/useMoviesData';
import useSearch from '@/hooks/useSearch';

const MoviesSearch = () => {
  const router = useRouter();
  const { data: moviesData, isLoading } = useMoviesData();
  const { data } = useSearch(router.query.keyword as string);
  


  return (
    <div className="h-screen w-screen bg-black">
      <p>{router.query.keyword}</p>
      {/* <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {data?.title}
        </p>
      </nav> */}
      {/* {data != null && data.videoUrl ? (
        <div className="pt-40 px-20">
          <iframe
            src={`${data.videoUrl}?autoplay=1`}
            allowFullScreen
            className="h-[70vh] w-[60vw]"
          />
        </div>
      ) : null} */}
    </div>
  );
};

export default MoviesSearch;
