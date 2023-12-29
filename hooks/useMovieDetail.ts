
import useSWR from "swr";
import fetcher from "@/lib/fetchAPI";
// /api/movieDetail/${id}
const useMoviesDetail = (slug: string) => {
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

export default useMoviesDetail