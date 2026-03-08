'use client'
import UserMenu from "../../../components/UserMenu";
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
import { ChevronLeftIcon, LinkIcon } from "@heroicons/react/24/outline";

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
      <div>
        <div className="px-4 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 pb-20 py-4 lg:pt-12 lg:pb-24 flex flex-row justify-between items-center">
          <div className="min-w-0 flex-1 flex flex-row items-center">
            <ActionButton
              label="Go Back"
              onClick={() => router.back()}
              icon={ChevronLeftIcon}
              className="inline-flex items-center rounded-lg px-4 py-2.5 font-semibold !bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-300 hover:scale-105 z-10"
              disabled={false}
            />
            <ActionButton
              label="Link to post"
              onClick={() => window.open(post.url, '_blank', 'noopener,noreferrer')}
              icon={LinkIcon}
              className="inline-flex items-center rounded-lg px-4 py-2.5 ml-2 font-semibold !bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-300 hover:scale-105 z-10"
              disabled={false}
            />
          </div>
          <div className="flex items-center"><UserMenu transparent /></div>
        </div>
      </div>
      <article className="m-3 lg:mx-8 py-10 px-6 lg:px-12 flex lg:flex-row flex-col rounded-lg min-h-[95vh] -mt-20 bg-[var(--background)]/20 backdrop-blur-md shadow-xl">
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
          <div className="mt-6 mb-8 md:mb-0">
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
          <div className="mt-6">
            <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full border-2 border-white/20 text-white shadow-md">
              <time className="font-mono">
                {`Created at: ${new Date(post.created_at).toLocaleDateString()} ${new Date(post.created_at).toLocaleTimeString()}`}
              </time>
            </span>
          </div>
        </div>
      </article>
    </Fragment>
  )
}
