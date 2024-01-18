
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useGetAllComment = () => {
    const {data, error, isLoading, mutate} = useSWR('/api/comments/getAll', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useGetAllComment