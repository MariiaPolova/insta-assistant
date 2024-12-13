'use client'
import type { IAccount } from "../../interfaces/account";
import type { IPost } from "../../interfaces/post";
import { useParams } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  LinkIcon,
  PencilIcon,
} from '@heroicons/react/20/solid';
import useSwr from "swr";
import { Fragment } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function AccountInfoPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useSwr<IAccount>(
    id ? `http://localhost:3001/api/accounts/${id}` : null,
    fetcher,
  );

  const { data: posts, error: postError, isLoading: postIsLoading } = useSwr<IPost[]>(
    id ? `http://localhost:3001/api/${id}/posts` : [],
    fetcher,
  );

  if (error) return <div>Failed to load account</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <Fragment>
      <div className="lg:flex lg:items-center lg:justify-between lg:m-10 bg-cyan-400 lg:p-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {data.username}
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CheckIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-gray-400" />
              {data.last_build_id}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-gray-400" />
              {new Date(data.last_fetch_date).toISOString()}
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="hidden sm:block">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <PencilIcon aria-hidden="true" className="-ml-0.5 mr-1.5 size-5 text-gray-400" />
              Edit
            </button>
          </span>

          <span className="ml-3 hidden sm:block">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <LinkIcon aria-hidden="true" className="-ml-0.5 mr-1.5 size-5 text-gray-400" />
              View
            </button>
          </span>

          {/* Dropdown */}
          <Menu as="div" className="relative ml-3 sm:hidden">
            <MenuButton className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
              More
              <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-1.5 size-5 text-gray-400" />
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                >
                  Edit
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                >
                  View
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
      <div className="bg-gray-100">
        {postIsLoading && <div>Posts are loading</div>}
        {!postIsLoading && !postError && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-10 sm:py-6 lg:max-w-none lg:py-8">
              <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                {posts.map((posts) => (
                  <div key={posts.post_id} className="group py-2">
                    <img
                      alt={posts.post_id}
                      src={posts.display_url}
                      className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square"
                    />
                    <div className="mt-6 text-sm">
                      {posts.hashtags.map((hashtag, i) => (
                        <span key={`${hashtag}-${i}}`} className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20 m-1">
                          {hashtag}
                        </span>
                      ))}
                    </div>
                    <p className="text-base line-clamp-3 text-gray-600">{posts.caption}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>)}
      </div>
    </Fragment>
  )
}
