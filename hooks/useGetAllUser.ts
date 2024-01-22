
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useGetAllUser = () => {
    const {data, error, isLoading} = useSWR('/api/user', fetcher, {
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

export default useGetAllUser