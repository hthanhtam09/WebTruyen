import { useState } from "react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { StoriesInterface } from '@/types';

interface Props {
    data: StoriesInterface | undefined;
    isLoading: boolean
    fetchMoreData: (storySlug: string, page: number) => void;
}
  

const useStoryDetail = (storySlug: string): Props => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {data, mutate} = useSWR(`/api/storyDetail/${storySlug}?page=0`, fetcher, {
        revalidateIfStale: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
    });

    const fetchMoreData = async (storySlug: string, page: number) => {
        setIsLoading(true)
        const newUrl = `/api/storyDetail/${storySlug}?page=${page}`;
        const newData = await fetcher(newUrl);
        if (newData) {
            setIsLoading(false)
            mutate(newData, false); 
        }
       
    };

    return {
        data,
        isLoading,
        fetchMoreData
    };
};

export default useStoryDetail;
