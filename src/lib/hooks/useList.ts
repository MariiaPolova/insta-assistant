import useSWR from "swr"
import fetcher, { API_URL } from "../helpers/fetcher";

function useList<T>(id?: string) {
    const { data, error, isLoading } = useSWR<T>(id ? `${API_URL}/api/lists/${id}` : `${API_URL}/api/lists`,
        fetcher,
      );
   
    return {
      data : data as T,
      isLoading,
      error
    }
  }

  export default useList;