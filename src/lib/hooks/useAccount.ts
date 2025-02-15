import useSWR from "swr"
import fetcher, { API_URL } from "../helpers/fetcher";

function useAccount<T>(id?: string) {
    const { data, error, isLoading } = useSWR<T>(id ? `${API_URL}/api/accounts/${id}` : `${API_URL}/api/accounts`,
        fetcher,
      );
   
    return {
      data : data as T,
      isLoading,
      error
    }
  }

  export default useAccount;