'use client'
import useList from "../../../lib/hooks/useList";
import usePost from "../../../lib/hooks/usePost";
import { IPost } from "../../interfaces/post";
import { IList, IListWithPosts } from "../../interfaces/list";
import { Post } from "../../../components/posts/post";

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
      <h1 className="text-3xl font-bold mb-6">Posts in List: {list.name}</h1>
      <div className="mt-2 lg:mt-0 space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-6">
        {list.posts_ids.map((listPost: IPost) => (
          <ListPost key={listPost.id} postId={listPost.id} />
        ))}
      </div>
      {/* postMutates array now contains all post mutate functions for further use */}
    </div>
  );
}
