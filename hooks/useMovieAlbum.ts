import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useMovieAlbum = () => {
  const { data, error, isLoading } = useSWR('/api/movieAlbum', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useMovieAlbum;
