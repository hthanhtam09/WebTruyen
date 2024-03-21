import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useSearchStories = (keyword: string) => {
  const formattedKeyword = keyword.replace(/\s/g, '-');
  const { data, error, isLoading, mutate } = useSWR(
    `/api/searchStories?page=0&keyword=${encodeURIComponent(formattedKeyword)}`,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  );

  const fetchData = async (page: number, keyword: string) => {
    const formattedKeyword = keyword.replace(/\s/g, '-');
    let newUrl = `/api/searchStories?page=${page}`;
    if (keyword) {
      newUrl += `&keyword=${encodeURIComponent(formattedKeyword)}`;
    }
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

export default useSearchStories;
