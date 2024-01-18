import fetcher from '@/lib/fetcher';

const useAddComment = () => {
  const addComment = async (params: any) => {
    const url = '/api/comments/add';
    
    await fetcher(url, 'POST', params);

  };

  return {
    addComment,
  };
};

export default useAddComment;
