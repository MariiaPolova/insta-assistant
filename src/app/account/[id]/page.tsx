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

  const { posts, error: postError, isLoading: postIsLoading } = useAccountPosts(id);
  const [iPosts, setPosts] = useState<PostWithList[]>([]);

  useEffect(() => {
    if (posts) {
      setPosts(posts.map(post => ({
        ...post,
        lists: lists.filter(list => list.posts_ids.includes(post.post_id)).map(({ name }) => name)
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
      <div className="bg-gray-100">
        {postIsLoading && <div>Posts are loading</div>}
        {!postIsLoading && !postError && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-10 sm:py-6 lg:max-w-none lg:py-8">
              <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                {iPosts.map((post) => <Post key={post.id} post={post} lists={lists} update={mutate} />)}
              </div>
            </div>
          </div>)}
      </div>
    </Fragment>
  )
}
