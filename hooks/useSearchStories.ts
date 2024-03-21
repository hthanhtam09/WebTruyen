import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useSearchStories = (keyword: string) => {
  const formattedKeyword = keyword.replace(/\s/g, '-');
  const { data, error, isLoading } = useSWR(
    `/api/searchStories?keyword=${encodeURIComponent(formattedKeyword)}`,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useSearchStories;
