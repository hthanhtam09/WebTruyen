import useSWR from 'swr';
import fetcher from '@/lib/fetchAPI';

const useMovieAlbum = () => {
  const { data, error, isLoading } = useSWR('danh-sach/phim-moi-cap-nhat', fetcher, {
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
