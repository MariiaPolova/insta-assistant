'use client'
import Link from "next/link";
import useList from "../../lib/hooks/useList";
import { IList } from "../interfaces/list";

export default function ListsPage() {
  const { data: lists, isLoading, error } = useList<Array<IList>>();

  if (isLoading) {
    return <div className="mx-auto max-w-7xl w-full">Loading...</div>;
  }
  if (error) {
    return <div className="mx-auto max-w-7xl w-full text-red-600">Failed to load lists.</div>;
  }
  if (!lists || lists.length === 0) {
    return <div className="mx-auto max-w-7xl w-full">No lists found.</div>;
  }

  return (
    <div className="mx-auto max-w-7xl w-full">
      <h1 className="text-3xl font-bold mb-6">Available Lists</h1>
      <ul className="space-y-4">
        {lists.map((list) => (
          <li key={list.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <Link href={`/lists/${list.id}`} className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              {list.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
