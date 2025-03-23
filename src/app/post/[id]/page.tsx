'use client'
import { Fragment, useState, useMemo } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import usePost from "../../../lib/hooks/usePost";
import LoadingSpinner from "../../../components/common/Spinner";
import ErrorMessage from "../../../components/common/ErrorMessage";
import { getAverageRGB } from "../../../lib/helpers/pickImageColor";

export default function PostInfoPage() {
  const { id } = useParams() as { id: string };

  const { post, error: postError, isLoading: postIsLoading } = usePost(id);
  const [image, setImage] = useState(null);
  const color = useMemo(() => getAverageRGB(image), [image]);

  if (!post && postIsLoading) {
    return <LoadingSpinner />;
  }

  if (postError)
    return (
      <ErrorMessage message="Cannot load data" />
    );

  return (
    <Fragment>
      <article className="m-3 py-10 px-4 sm:px-6 lg:px-8 flex gap-y-4 lg:flex-row flex-col bg-gray-100 rounded-lg min-h-[95vh]">
        <Image
          onLoad={(e) => setImage(e.target)}
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
              className="relative z-10 rounded-full px-3 py-1.5 font-medium text-white hover:bg-blue-100"
              style={{
                backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, .7)`,
                borderColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                boxShadow: `0 0 0 1px rgba(${color.r}, ${color.g}, ${color.b}, 0.05)`
              }}
            >
              Link to {post.account_username}&apos;s post
            </a>
          </div>
          <p className="mt-5 whitespace-break-spaces text-sm/6 text-gray-600">{post.caption}</p>
          <div className="mt-6">
            {post.hashtags.map((hashtag, i) =>
              <span
                key={`${post.id}-${i}`}
                className="inline-flex items-center rounded-md mx-1 px-2 my-1 py-2 text-xs font-lg ring-1 ring-inset"
                style={{
                  backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, .1)`,
                  color: `rgb(${color.r}, ${color.g}, ${color.b})`,
                  borderColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                  boxShadow: `0 0 0 1px rgba(${color.r}, ${color.g}, ${color.b}, 0.05)`
                }}
              >
                {hashtag}
              </span>
            )}
          </div>
        </div>
      </article>
    </Fragment>
  )
}
