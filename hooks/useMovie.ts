
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovie = () => {
    const {data, error, isLoading} = useSWR('/api/moviesDetail', fetcher, {
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

export default useMovie