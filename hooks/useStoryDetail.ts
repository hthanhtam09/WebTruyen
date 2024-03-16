import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { StoriesInterface } from '@/types';
import { useState } from "react";

interface Props {
    data: StoriesInterface | undefined;
    isLoading: boolean
    fetchMoreData: (storySlug: string, page: number) => void;
}
  

const useStoryDetail = (storySlug: string): Props => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {data, mutate} = useSWR(`/api/storyDetail/${storySlug[0]}?page=${0}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const fetchMoreData = async (storySlug: string, page: number) => {
        setIsLoading(true)
        const newUrl = `/api/storyDetail/${storySlug[0]}?page=${page}`;
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
