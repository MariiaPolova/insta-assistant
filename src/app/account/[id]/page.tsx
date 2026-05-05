'use client'
import { Fragment, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { LinkIcon, ArrowRightStartOnRectangleIcon, InboxArrowDownIcon } from '@heroicons/react/20/solid';

import PageHeader from "../../../components/pageHeader";
import LoadingSpinner from "../../../components/common/Spinner";
import ErrorMessage from "../../../components/common/ErrorMessage";
import useAccount from "../../../lib/hooks/useAccount";
import useAccountPosts from "../../../lib/hooks/useAccountPosts";
import { IAccount } from "../../interfaces/account";
import useList from "../../../lib/hooks/useList";
import { IList } from "../../../app/interfaces/list";

import { PostWithList } from "../../interfaces/post";
import { Post } from "../../../components/posts/post";
import ActionButton from '../../../components/common/ActionButton';




export default function AccountInfoPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const { data: account, error, isLoading } = useAccount<IAccount>(id);
  const { data: lists, error: listsError, isLoading: listsIsLoading, mutate } = useList<IList[]>();

  const { posts, error: postError, isLoading: postIsLoading, mutate: postsUpdate } = useAccountPosts(id);
  const [iPosts, setPosts] = useState<PostWithList[]>([]);

  useEffect(() => {
    if (posts) {
      setPosts(posts.map(post => ({
        ...post,
        lists: lists?.filter(list => list.posts_ids?.includes(post.post_id)).map(({ name }) => name)
      })));
    }
  }, [posts, lists]);

  const getTimeAgo = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Recently';
    }
  };

  if (!account && isLoading || !lists && listsIsLoading) {
    return <LoadingSpinner />;
  }

  if (error || postError || listsError)
    return (
      <ErrorMessage message="Cannot load data" />
    );

  const { username, end_fetch_date } = account;

  return (
    <Fragment>
      <PageHeader data={account} />
      {postIsLoading && (
        <div className="m-3 lg:mx-8 py-10 px-6 lg:px-12 flex items-center justify-center rounded-lg min-h-[85vh] -mt-16 bg-[var(--background)]/20 backdrop-blur-md shadow-xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Loading posts...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="m-3 lg:mx-8 lg:py-10 px-6 lg:px-12 flex gap-y-6 flex-col rounded-lg min-h-[85vh] -mt-16 bg-[var(--background)]/20 backdrop-blur-md shadow-xl">
        {/* Account link, fetch button, and fetch date */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
          <span className="inline-flex items-center px-4 py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 shadow-md sm:order-3 cursor-pointer hover:from-blue-200 hover:to-indigo-200 dark:hover:from-blue-900/40 dark:hover:to-indigo-900/40 transition-all duration-300">
            <LinkIcon aria-hidden="true" className="mr-2 size-5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-medium opacity-75">Account</span>
              <span className="font-semibold">@{username}</span>
            </div>
          </span>
          <span className="inline-flex items-center px-4 py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 shadow-md sm:order-2 cursor-pointer hover:from-green-200 hover:to-emerald-200 dark:hover:from-green-900/40 dark:hover:to-emerald-900/40 transition-all duration-300">
            <InboxArrowDownIcon aria-hidden="true" className="mr-2 size-5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-medium opacity-75">Action</span>
              <span className="font-semibold">Fetch Posts</span>
            </div>
          </span>
          {end_fetch_date && (
            <span className="inline-flex items-center px-4 py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 shadow-md sm:order-1">
              <ArrowRightStartOnRectangleIcon aria-hidden="true" className="mr-2 size-5 shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs font-medium opacity-75">Last fetch</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{getTimeAgo(end_fetch_date)}</span>
                  <span className="text-xs opacity-60 font-mono">
                    {new Date(end_fetch_date).toLocaleDateString()} {new Date(end_fetch_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              </div>
            </span>
          )}
        </div>
        {!postIsLoading && !postError && (
          <div className="mx-auto max-w-7xl w-full">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="mt-2 lg:mt-0 space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-6">
                {iPosts.map((post) => <Post key={post.id} post={post} lists={lists} update={mutate} postsUpdate={postsUpdate}/>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  )
}
