import fetcher from '@/lib/fetcher';

const useDeleteComment = () => {
  const deleteComment = async (params: any) => {
    const url = '/api/comments/delete';
    await fetcher(url, 'POST', params);
  };

  return {
    deleteComment,
  };
};

export default useDeleteComment;
