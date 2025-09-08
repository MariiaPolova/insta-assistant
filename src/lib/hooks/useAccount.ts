import useSWR from "swr"
import fetcher from "../helpers/fetcher";

console.log('useAccount process.env.NEXT_PUBLIC_API_URL');
console.log(process.env.NEXT_PUBLIC_API_URL);
function useAccount<T>(id?: string) {
  const { data, error, isLoading } = useSWR<T>(id ? 
    `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/${id}` : 
    `${process.env.NEXT_PUBLIC_API_URL}/api/accounts`,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    data: data as T,
    isLoading,
    error
  }
}

export default useAccount;