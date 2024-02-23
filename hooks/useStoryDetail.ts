
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { StoriesInterface } from '@/types';

interface Props {
    data: StoriesInterface | undefined;
    error: any;
    isLoading: boolean;
  }
  

const useStoryDetail  = (storySlug: string): Props => {
    const {data, error, isLoading} = useSWR(`/api/storyDetail/${storySlug}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    return {
        data,
        error,
        isLoading,
    }
}

export default useStoryDetail