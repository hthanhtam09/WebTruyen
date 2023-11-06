/* eslint-disable react-hooks/rules-of-hooks */
import Navbar from '@/components/Navbar';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import { useRouter } from 'next/router';
import PlayButton from '@/components/PlayButton';
import Loading from '../loading';
import InfoModal from '@/components/InfoModal';
import useInfoModalStore from '@/hooks/useInfoModalStore';

const MovieAlbumScreen = () => {
  const router = useRouter();
  const { data: movies = [], isLoading } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModalStore();

  const movieData = movies.filter((ele: any) => ele.albumId === router.query.id);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="flex-col pt-32 px-4 md:px-16 py-6 flex items-start transition duration-500 bg-zinc-900 bg-opacity-90">
        <p className="text-white font-bold text-4xl">{router.query.title}</p>

        <p className="text-white font-normal text-lg w-3/6 py-6">
          <span className="text-gray-400">Description: </span>
          {router.query.description}
        </p>
        {movies.length ? <PlayButton movieId={(Object.values(movies)[0] as any).id} /> : null}
        <div className="w-full h-[1px] bg-gray-300 mt-10" />
        <MovieList title="Episodes 1-16" data={movieData} style="mt-10" />
        <div className="w-full h-[1px] bg-gray-300 my-20" />
        <MovieList title="My List" data={favorites} />
      </div>
      <InfoModal visible={isOpen} onClose={closeModal} />
    </>
  );
};

export default MovieAlbumScreen;
