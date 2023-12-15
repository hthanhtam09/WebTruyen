import useSWR from "swr";
import fetcher from "@/lib/fetchAPI";

const useMovieList = (page: number = 1) => {
    const {data, error, isLoading} = useSWR(`danh-sach/phim-moi-cap-nhat?page=${page}}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    },)

    return {
        data,
        error,
        isLoading
    }
}

export default useMovieList