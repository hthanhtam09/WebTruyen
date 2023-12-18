import useSWR from 'swr';
import fetcher from '@/lib/fetchAPI';

const useMovieList = (keyword: string = '') => {
  const { data, error, isLoading, mutate } = useSWR(
    `_next/data/s4OlXy8jONoHVWAT5vg7b/tim-kiem.json?keyword=${keyword}`,
    (url) => fetcher(url, true),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    data,
    mutate,
    error,
    isLoading,
  };
};

export default useMovieList;
