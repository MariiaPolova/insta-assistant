'use client'
import Link from "next/link";
import useAccount from "../../lib/hooks/useAccount";
import type { IAccount } from "../interfaces/account";
import LoadingSpinner from "../../components/common/Spinner";
import ErrorMessage from "../../components/common/ErrorMessage";


export default function Index() {
  const { data, error, isLoading } = useAccount<IAccount[]>();
  if (!data && isLoading) {
    return <LoadingSpinner />;
  }

  if (error)
    return (
      <ErrorMessage message="Cannot load accounts" />
    );

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {data.map((account) => (
        <li key={account.username} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            {/* <img alt="" src={person.imageUrl} className="size-12 flex-none rounded-full bg-gray-50" /> */}
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">{account.username}</p>
              {/* <p className="mt-1 truncate text-xs/5 text-gray-500">{new Date(account.last_fetch_date).toISOString()}</p> */}
            </div> 
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <Link href="/account/[id]" as={`/account/${account.username}`}>
            { account.username }
          </Link>
          </div>
        </li>
      ))}
    </ul>
  )
}