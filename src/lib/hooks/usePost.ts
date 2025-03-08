import useSWR from "swr";
import useSWRMutation from 'swr/mutation'
import fetcher, { API_URL } from "../helpers/fetcher";
import { IPost } from "../../app/interfaces/post";

function usePost (id: string) {
    const { data, error, isLoading } = useSWR<IPost[]>(
        id ? `${API_URL}/api/${id}/posts` : [],
        fetcher,
      );

      const { trigger } = useSWRMutation(id ? `${API_URL}/api/${id}/posts` : [],
        fetcher,)
   
    return {
      posts: data,
      isLoading,
      error,
      trigger
    }
  }

  export default usePost;