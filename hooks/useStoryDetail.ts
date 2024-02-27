import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { StoriesInterface } from '@/types';

interface Props {
    data: StoriesInterface | undefined;
    fetchMoreData: (storySlug: string, page: number) => void;
}
  

const useStoryDetail = (storySlug: string): Props => {
    const {data, mutate} = useSWR(`/api/storyDetail/${storySlug[0]}?page=${0}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    const fetchMoreData = async (storySlug: string, page: number) => {
        const newUrl = `/api/storyDetail/${storySlug[0]}?page=${page}`;
        const newData = await fetcher(newUrl);
        mutate(newData, false); 
    };

    return {
        data,
        fetchMoreData
    };
};

export default useStoryDetail;
