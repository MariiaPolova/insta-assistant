'use client'
import { Fragment, useEffect, useState } from "react";
import { useParams } from "next/navigation";

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



export default function AccountInfoPage() {
  const { id } = useParams() as { id: string };

  const { data: account, error, isLoading } = useAccount<IAccount>(id);
  const { data: lists, error: listsError, isLoading: listsIsLoading, mutate } = useList<IList[]>();

  const { posts, error: postError, isLoading: postIsLoading, mutate: postsUpdate } = useAccountPosts(id);
  const [iPosts, setPosts] = useState<PostWithList[]>([]);

  useEffect(() => {
    if (posts) {
      setPosts(posts.map(post => ({
        ...post,
        lists: lists?.filter(list => list.posts_ids.includes(post.post_id)).map(({ name }) => name)
      })));
    }
  }, [posts, lists]);

  if (!account && isLoading || !lists && listsIsLoading) {
    return <LoadingSpinner />;
  }

  if (error || postError || listsError)
    return (
      <ErrorMessage message="Cannot load data" />
    );

  return (
    <Fragment>
      <PageHeader data={account} />
      <div className="m-3 lg:mx-8 py-10 px-6 lg:px-12 flex flex-col rounded-lg min-h-[95vh] -mt-16 bg-[var(--background)]/20 backdrop-blur-md shadow-xl">
        {postIsLoading && <div className="text-center py-12 text-gray-600 dark:text-gray-400 text-lg">Loading posts...</div>}
        {!postIsLoading && !postError && (
          <div className="mx-auto max-w-7xl w-full">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="mt-2 lg:mt-0 space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-6">
                {iPosts.map((post) => <Post key={post.id} post={post} lists={lists} update={mutate} postsUpdate={postsUpdate}/>)}
              </div>
            </div>
          </div>)}
      </div>
    </Fragment>
  )
}
