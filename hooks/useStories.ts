
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useStories = () => {
    const {data, error, isLoading} = useSWR('/api/stories', fetcher, {
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

export default useStories