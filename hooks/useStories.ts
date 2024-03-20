import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useStories = () => {
  const { data, error, isLoading, mutate } = useSWR(`/api/stories?page=0`, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  const fetchData = async (page: number) => {
    const newUrl = `/api/stories?page=${page}`;
    const newData = await fetcher(newUrl);
    mutate(newData, false);
  };

  return {
    data,
    error,
    isLoading,
    fetchData,
  };
};

export default useStories;
