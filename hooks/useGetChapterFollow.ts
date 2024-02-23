import fetcher from '@/lib/fetcher';

const useGetChapterFollow = () => {
  const getChapterFollow = async (params: any) => {
    const url = '/api/chapterFollow/get';
    await fetcher(url, 'GET', params);
  };

  return {
    getChapterFollow,
  };
};

export default useGetChapterFollow;
