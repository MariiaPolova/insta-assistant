'use client'
import { Fragment } from "react";
import { useParams } from "next/navigation";
import Image from 'next/image';

import PageHeader from "../../../components/pageHeader";
import LoadingSpinner from "../../../components/common/Spinner";
import ErrorMessage from "../../../components/common/ErrorMessage";
import useAccount from "../../../lib/hooks/useAccount";
import usePost from "../../../lib/hooks/usePost";
import { IAccount } from "../../interfaces/account";

import ListActionsDropdown from "../../../components/lists/listActions";

export default function AccountInfoPage() {
  const { id } = useParams() as { id: string };

  const { data: account, error, isLoading } = useAccount<IAccount>(id);

  const { posts, error: postError, isLoading: postIsLoading } = usePost(id);

  if (!account && isLoading) {
    return <LoadingSpinner />;
  }

  if (error || postError)
    return (
      <ErrorMessage message="Cannot load data" />
    );

  return (
    <Fragment>
      <PageHeader data={account}/>
      <div className="bg-gray-100">
        {postIsLoading && <div>Posts are loading</div>}
        {!postIsLoading && !postError && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-10 sm:py-6 lg:max-w-none lg:py-8">
              <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                {posts.map((posts) => (
                  <div key={posts.post_id} className="group  py-2">
                    <div className="relative">
                      <Image
                        alt={posts.post_id}
                        src={posts.display_url}
                        width={500}
                        height={500}
                        className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square"
                      />
                      <div className="absolute top-1 right-1"> 
                        <ListActionsDropdown postId={posts.id}/>
                      </div>
                    </div>
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
