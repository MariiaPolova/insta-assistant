import useSWR from "swr"
import fetcher from "../helpers/fetcher";

function useList<T>(id?: string) {
    const { data, error, isLoading, mutate } = useSWR<T>(id ? `${process.env.NEXT_PUBLIC_API_URL}/api/lists/${id}` : `${process.env.NEXT_PUBLIC_API_URL}/api/lists`,
        fetcher,
        { revalidateOnFocus: false }
      );
   
    return {
      data : data as T,
      isLoading,
      error,
      mutate
    }
  }

  export default useList;