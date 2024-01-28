
import useSWR from "swr";
import fetcher from "@/lib/fetchAPI";

const useStoriesDetail = (slug: string) => {
    const {data, error, isLoading} = useSWR(`/phim/${slug}`, fetcher, {
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

export default useStoriesDetail