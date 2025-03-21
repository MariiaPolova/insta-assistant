import useSWR from "swr";
import fetcher, { API_URL } from "../helpers/fetcher";
import { IPost } from "../../app/interfaces/post";

function usePost (id: string) {
    const { data, error, isLoading, mutate } = useSWR<IPost>(
      id ? `${API_URL}/api/posts/${id}` : null,
        fetcher,
        { revalidateOnFocus: false }
      );

    return {
      post: data,
      isLoading,
      error,
      mutate
    }
  }

  export default usePost;