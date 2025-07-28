'use client'
import { Fragment, useState, useMemo, useContext } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import usePost from "../../../lib/hooks/usePost";
import LoadingSpinner from "../../../components/common/Spinner";
import ErrorMessage from "../../../components/common/ErrorMessage";
import { getAverageRGB } from "../../../lib/helpers/pickImageColor";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import { ThemeContext } from "../../../context/themeContext";
import ActionButton from "../../../components/common/ActionButton";

export default function PostInfoPage() {
  const { id } = useParams() as { id: string };

  const { post, error: postError, isLoading: postIsLoading } = usePost(id);
  const [image, setImage] = useState(null);
  const color = useMemo(() => getAverageRGB(image), [image]);
  const router = useRouter();
  const { theme } = useContext(ThemeContext)

  if (!post && postIsLoading) {
    return <LoadingSpinner />;
  }

  if (postError)
    return (
      <ErrorMessage message="Cannot load data" />
    );

  return (
    <Fragment>
      <div className="px-4 pb-20"
        style={{
          backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`
        }}>
        <div className="flex flex-row justify-between items-center py-1 sm:py-2 lg:py-4 lg:px-8">
          <ActionButton
            label="Go Back"
            onClick={() => router.back()}
            icon={ArrowUturnLeftIcon}
          />
          <div className="mt-6 flex flex-col items-center">
            <a
              href={post.url}
              className="relative z-10 rounded-full px-3 py-1.5 font-medium text-white hover:bg-blue-100 border-2 border-white"
            >
              Link to {post.account_username}&apos;s post
            </a>
            <time className="text-white-10  0 text-sm mt-1">
              {`${new Date(post.created_at).toLocaleDateString()} ${new Date(post.created_at).toLocaleTimeString()}`}
            </time>
          </div>
        </div>
      </div>
      <article className="m-3 lg:mx-8 py-10 px-4 sm:px-6 lg:px-12 flex gap-y-4 lg:flex-row flex-col rounded-lg min-h-[95vh] -mt-20 bg-white/20 backdrop-blur-md">
        <Image
          onLoad={(e) => setImage(e.target)}
          className="w-35 object-cover max-sm:h-80 sm:aspect-[2/1] lg:aspect-square rounded-lg"
          src={post.display_url}
          alt="food image"
          width={500}
          height={500}
        />
        <div className="text-sm md:text-md max-w-2xl px-0 md:px-4 lg:px-8">
          <p className="mt-5 whitespace-break-spaces text-sm/6 text-gray-600 dark:text-gray-100">{post.caption}</p>
          <div className="mt-6">
            {post.hashtags.map((hashtag, i) =>
              <span
                key={`${post.id}-${i}`}
                className="inline-flex items-center rounded-md mx-1 px-2 my-1 py-2 text-xs font-lg ring-1 ring-inset"
                style={{
                  backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${theme === 'light' ? '.1' : '.9'})`,
                  color: theme === 'dark' ? 'white' : `rgb(${color.r}, ${color.g}, ${color.b})`,
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
