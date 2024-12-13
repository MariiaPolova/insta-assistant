'use client'
import type { IAccount } from "../interfaces/account";
import useSwr from "swr";
import Link from "next/link";

const fetcher = (url: string) => {
  return fetch(url).then((res) => res.json().catch(err => console.log(err)))
};

export default function Index() {
  const { data, error, isLoading } = useSwr<IAccount[]>(
    `http://localhost:3001/api/accounts`,
    fetcher,
  );
  if (error) return <div>Failed to load accounts</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

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