'use client'
import { Fragment } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import usePost from "../../../lib/hooks/usePost";
import LoadingSpinner from "../../../components/common/Spinner";
import ErrorMessage from "../../../components/common/ErrorMessage";

export default function PostInfoPage() {
  const { id } = useParams() as { id: string };

  const { post, error: postError, isLoading: postIsLoading } = usePost(id);

  if (!post && postIsLoading) {
    return <LoadingSpinner />;
  }

  if (postError)
    return (
      <ErrorMessage message="Cannot load data" />
    );

  return (
    <Fragment>
      <article>
        <Image
          className="h-96 w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
          src={post.display_url}
          alt="food image"
          width={500}
          height={500}
        />
        <div className="flex items-center gap-x-4 text-xs">
          <time className="text-gray-500">
            {post.created_at}
          </time>
          <a
            href={post.url}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            Link to {post.account_username}&apos;s post
          </a>
        </div>
        <div className="group relative">
          <p className="mt-5 whitespace-pre text-sm/6 text-gray-600">{post.caption}</p>
        </div>
      </article>
    </Fragment>
  )
}
