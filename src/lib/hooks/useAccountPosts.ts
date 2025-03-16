import useSWR from "swr";
import fetcher, { API_URL } from "../helpers/fetcher";
import { IPost } from "../../app/interfaces/post";

function useAccountPosts (accountUsername: string) {
    const { data, error, isLoading, mutate } = useSWR<IPost[]>(
      accountUsername ? `${API_URL}/api/${accountUsername}/posts` : [],
        fetcher,
        { revalidateOnFocus: false }
      );

    return {
      posts: data,
      isLoading,
      error,
      mutate
    }
  }

  export default useAccountPosts;