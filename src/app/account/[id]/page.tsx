'use client'
import type { IAccount } from "../../interfaces/account";
import { useParams } from "next/navigation";
import useSwr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AccountInfoPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useSwr<IAccount>(
    id ? `http://localhost:3001/api/accounts/${id}` : null,
    fetcher,
  );

  if (error) return <div>Failed to load account</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return <div>
    <ul>
      <li>{data.username}</li>
      <li>{new Date(data.last_fetch_date).toISOString()}</li>
      <li>{data.last_build_id}</li>
    </ul>
    </div>;
}