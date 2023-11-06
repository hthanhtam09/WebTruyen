import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';
import Loading from '../loading';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data, isLoading } = useMovie(movieId as string);

  return isLoading ? (
    <div className="h-screen w-screen">
      <Loading />
    </div>
  ) : (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <ArrowLeftIcon
          onClick={() => router.push('/')}
          className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition"
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {data?.title}
        </p>
      </nav>
      {data != null && data.videoUrl ? (
        <iframe src={`${data.videoUrl}?autoplay=1`} allowFullScreen className="h-full w-full" />
      ) : null}
    </div>
  );
};

export default Watch;
