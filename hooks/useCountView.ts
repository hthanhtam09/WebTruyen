import fetcher from '@/lib/fetcher';

const useCountView = () => {
  const countView = async (params: any) => {
    const url = '/api/countView';
    await fetcher(url, 'POST', params);
  };

  return {
    countView,
  };
};

export default useCountView;
