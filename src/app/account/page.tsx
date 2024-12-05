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
    <ul>
      {data.map((account) => (
        <li key={account.username}>
          <Link href="/account/[id]" as={`/account/${account.username}`}>
            { account.username }
          </Link>
        </li>
      ))}
    </ul>
  );
}