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
      <article className="m-3 py-10 px-4 sm:px-6 lg:px-8 flex gap-y-4 lg:flex-row flex-col bg-gray-100 rounded-lg">
        <Image
          className="w-35 object-cover max-sm:h-80 sm:aspect-[2/1] lg:aspect-square rounded-lg"
          src={post.display_url}
          alt="food image"
          width={500}
          height={500}
        />
        <div className="text-sm md:text-md max-w-2xl px-0 md:px-4 lg:px-8">
          <div className="flex justify-between items-center">
            <time className="text-gray-500">
              {`${new Date(post.created_at).toLocaleDateString()} ${new Date(post.created_at).toLocaleTimeString()}`}
            </time>
            <a
              href={post.url}
              className="relative z-10 rounded-full bg-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:bg-blue-100"
            >
              Link to {post.account_username}&apos;s post
            </a>
          </div>
          <p className="mt-5 whitespace-break-spaces text-sm/6 text-gray-600">{post.caption}</p>
        </div>
      </article>
    </Fragment>
  )
}
