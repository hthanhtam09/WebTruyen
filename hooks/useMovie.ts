import useSwr from 'swr'
import fetchAPI from '@/lib/fetchAPI';

const useMovie = (slug: string) => {
  const { data, error, isLoading } = useSwr(`phim/${slug}`, fetchAPI, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading
  }
};

export default useMovie;