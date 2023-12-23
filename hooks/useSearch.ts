import useSWR from 'swr';
import poster from '@/lib/poster';

const useSearch = (searchValue: string) => {
  const { data, error, isLoading } = useSWR(
    '/api/moviesSearch',
    () => poster(searchValue, '/api/moviesSearch'),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useSearch;
