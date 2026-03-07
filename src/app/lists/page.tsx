'use client'
import Link from "next/link";
import UserMenu from "../../components/UserMenu";
import useList from "../../lib/hooks/useList";
import { IList } from "../interfaces/list";
import ActionButton from "../../components/common/ActionButton";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function ListsPage() {
  const { data: lists, isLoading, error } = useList<Array<IList>>();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[40vh]"><span className="text-gray-600 dark:text-gray-400">Loading...</span></div>;
  }
  if (error) {
    return <div className="flex items-center justify-center min-h-[40vh] text-red-600">Failed to load lists.</div>;
  }
  if (!lists || lists.length === 0) {
    return <div className="flex items-center justify-center min-h-[40vh]">No lists found.</div>;
  }

  return (
    <div>
      <div className="px-4 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 pb-20 py-4 lg:pt-12 lg:pb-24 flex flex-row justify-between items-center">
        <ActionButton
          label="Go Back"
          onClick={() => { window.history.back() }}
          icon={ChevronLeftIcon}
          className="inline-flex items-center rounded-lg px-4 py-2.5 font-semibold !bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-300 hover:scale-105"
          disabled={false}
        />
        <div className="flex items-center"><UserMenu transparent /></div>
      </div>
      <div className="m-3 lg:mx-8 py-10 px-6 lg:px-12 flex gap-y-4 flex-col rounded-lg min-h-[95vh] -mt-16 bg-[var(--background)]/20 backdrop-blur-md shadow-xl">
        <ul role="list" className="space-y-4">
          {lists.map((list, index) => (
            <li key={`${list.id}_${index}`} className="group bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400">
              <div className="flex justify-between gap-x-6 items-center">
                <div className="flex min-w-0 gap-x-4">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl group-hover:scale-110 transition-transform">
                    <svg className="size-10 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 8.25h15m-15 0A2.25 2.25 0 0 1 6.75 6h10.5a2.25 2.25 0 0 1 2.25 2.25m-15 0v7.5A2.25 2.25 0 0 0 6.75 18h10.5a2.25 2.25 0 0 0 2.25-2.25v-7.5m-15 0h15" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-auto">
                    <p className="text-base font-bold text-gray-900 dark:text-white">{list.name}</p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{Array.isArray(list.posts_ids) ? `${list.posts_ids.length} posts` : '0 posts'}</p>
                  </div>
                </div>
                <Link
                  href="/lists/[id]"
                  as={`/lists/${list.id}`}
                  className="flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105"
                >
                  <span className="text-sm">View Posts</span>
                  <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
