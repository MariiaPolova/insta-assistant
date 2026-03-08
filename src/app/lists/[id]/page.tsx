'use client'
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import ActionButton from "../../../components/common/ActionButton";
import useList from "../../../lib/hooks/useList";
import usePost from "../../../lib/hooks/usePost";
import { IPost } from "../../interfaces/post";
import { IList, IListWithPosts } from "../../interfaces/list";
import { Post } from "../../../components/posts/post";
import UserMenu from "../../../components/UserMenu";

export default function ListItemsPage({ params }: { params: { id: string } }) {
  // Fetch the list object
  const { data: list, isLoading: listLoading, error: listError, mutate: listMutate } = useList<IListWithPosts>(params.id);

  if (listLoading) {
    return <div className="mx-auto max-w-7xl w-full">Loading...</div>;
  }
  if (listError) {
    return <div className="mx-auto max-w-7xl w-full text-red-600">Failed to load list.</div>;
  }
  if (!list || !list.posts_ids || list.posts_ids.length === 0) {
    return <div className="mx-auto max-w-7xl w-full">No posts found in this list.</div>;
  }


  // Child component to safely use usePost hook
  function ListPost({ postId }: { postId: string }) {
    const { post, isLoading, error } = usePost(postId);
    if (isLoading) return <div key={postId}>Loading post...</div>;
    if (error || !post) return <div key={postId} className="text-red-600">Failed to load post.</div>;
    return <Post key={post.id} post={post} lists={[]} />;
  }

  return (
    <div className="mx-auto max-w-7xl w-full">
      <div className="flex flex-row justify-between px-4 py-8 lg:px-8 lg:py-12 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
        <div className="">
          <ActionButton
            label="Go Back"
            onClick={() => window.history.back()}
            icon={ChevronLeftIcon}
            className="inline-flex items-center rounded-lg px-4 py-2.5 font-semibold !bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-300 hover:scale-105"
            disabled={false}
          />
        </div>
        <div className="flex items-center hidden lg:flex">
          <h1 className="text-3xl font-bold text-white mr-2 lg:mr-8">{list.name}</h1>
          <span className="inline-flex items-center px-4 py-2.5 text-base font-semibold rounded-full bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-md">
            {list.posts_ids.length} posts
          </span>
        </div>
          <div className="flex items-center"><UserMenu transparent /></div>
      </div>
      <div className="mt-2 lg:mt-0 space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-6 m-3 lg:mx-8 py-10 px-6 lg:px-12 rounded-lg min-h-[95vh] -mt-16 bg-[var(--background)]/20 backdrop-blur-md shadow-xl">
        {list.posts_ids.map((listPost: IPost) => (
          <ListPost key={listPost.id} postId={listPost.id} />
        ))}
      </div>
      {/* postMutates array now contains all post mutate functions for further use */}
    </div>
  );
}
