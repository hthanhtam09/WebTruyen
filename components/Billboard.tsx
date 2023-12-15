import React, { useCallback } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
// import PlayButton from '@/components/PlayButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import Loading from '@/pages/loading';
import useMovieList from '@/hooks/useMovieList';
import useMovie from '@/hooks/useMovie';
import CitiesSlider from '@/components/CitiesSlider';

const Billboard: React.FC = () => {
  const { openModal } = useInfoModalStore();
  const { data: movieList = [], isLoading } = useMovieList();
  const movieCount = movieList?.items?.length || 0;
  const randomIndex = Math.floor(Math.random() * movieCount);

  const { data: movie } = useMovie(
    movieList?.items != null ? movieList?.items[randomIndex].slug : 'nguoi-doi-nhi',
  );

  // const handleOpenModal = useCallback(() => {
  //   openModal(data?.id);
  // }, [openModal, data?.id]);

  return isLoading ? (
    <div className="relative h-[56.25vw]">
      <Loading />
    </div>
  ) : (
    <div className="h-[56.25vw]">
      <CitiesSlider  />;
      {/* <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {movie?.movie.name || ''}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl line-clamp-5">
          {movie?.movie.content || ''}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <button
            // onClick={handleOpenModal}
            className="
            bg-white
            text-white
              bg-opacity-30 
              rounded-md 
              py-1 md:py-2 
              px-2 md:px-4
              w-auto 
              text-xs lg:text-lg 
              font-semibold
              flex
              flex-row
              items-center
              hover:bg-opacity-20
              transition
            "
          >
            <InformationCircleIcon className="w-4 md:w-7 mr-1" />
            More Info
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Billboard;
