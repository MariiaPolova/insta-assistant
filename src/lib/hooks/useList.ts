import useSWR from "swr"
import fetcher, { API_URL } from "../helpers/fetcher";

function useList<T>(id?: string) {
    const { data, error, isLoading, mutate } = useSWR<T>(id ? `${API_URL}/api/lists/${id}` : `${API_URL}/api/lists`,
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