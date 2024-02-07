import fetcher from '@/lib/fetcher';

const useAddChapterFollow = () => {
  const addChapterFollow = async (params: any) => {
    const url = '/api/chapterFollow/add';
    await fetcher(url, 'POST', params);
  };

  return {
    addChapterFollow,
  };
};

export default useAddChapterFollow;
