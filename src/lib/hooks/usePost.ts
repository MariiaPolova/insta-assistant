import useSWR from "swr";
import fetcher from "../helpers/fetcher";
import { IPost } from "../../app/interfaces/post";

function usePost (id: string) {
    const { data, error, isLoading, mutate } = useSWR<IPost>(
      id ? `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}` : null,
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