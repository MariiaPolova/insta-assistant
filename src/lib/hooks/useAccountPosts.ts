import useSWR from "swr";
import fetcher from "../helpers/fetcher";
import { IPost } from "../../app/interfaces/post";

function useAccountPosts (accountUsername: string) {
    const { data, error, isLoading, mutate } = useSWR<IPost[]>(
      accountUsername ? `${process.env.NEXT_PUBLIC_API_URL}/api/${accountUsername}/posts` : [],
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