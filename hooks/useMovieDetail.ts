
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMoviesDetail = (id: string) => {
    const {data, error, isLoading} = useSWR(`/api/movieDetail/${id}`, fetcher, {
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

export default useMoviesDetail