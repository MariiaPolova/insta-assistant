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
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Loading list...</p>
        </div>
      </div>
    );
  }
  
  if (listError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <svg className="w-12 h-12 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Failed to load list</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">We encountered an error while loading your list. Please try again.</p>
          <ActionButton
            label="Go Back"
            onClick={() => window.history.back()}
            icon={ChevronLeftIcon}
            className="inline-flex items-center rounded-lg px-6 py-3 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            disabled={false}
          />
        </div>
      </div>
    );
  }
  
  if (!list || !list.posts_ids || list.posts_ids.length === 0) {
    return (
      <div>
        <div className="px-4 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 pb-20 py-4 lg:pt-12 lg:pb-24 flex flex-row justify-between items-center">
          <ActionButton
            label="Go Back"
            onClick={() => window.history.back()}
            icon={ChevronLeftIcon}
            className="inline-flex items-center rounded-lg px-4 py-2.5 font-semibold !bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-300 hover:scale-105"
            disabled={false}
          />
          <div className="flex items-center hidden lg:flex">
            <h1 className="text-3xl font-bold text-white mr-2 lg:mr-8">{list?.name || 'Unknown List'}</h1>
            <span className="inline-flex items-center px-4 py-2.5 text-base font-semibold rounded-full bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-md">
              0 posts
            </span>
          </div>
          <div className="flex items-center"><UserMenu transparent /></div>
        </div>
        
        <div className="m-3 lg:mx-8 py-10 px-6 lg:px-12 flex gap-y-4 flex-col rounded-lg min-h-[95vh] -mt-16 bg-[var(--background)]/20 backdrop-blur-md shadow-xl">
          <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full p-8 w-32 h-32 mx-auto mb-8 flex items-center justify-center">
              <svg className="w-16 h-16 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              This list is empty
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
              No posts have been added to "{list?.name || 'this list'}" yet. Start building your collection!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <ChevronLeftIcon className="w-5 h-5" />
                Back to Lists
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Browse Posts
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
      <div className="px-4 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 pb-20 py-4 lg:pt-12 lg:pb-24 flex flex-row justify-between items-center">
        <ActionButton
          label="Go Back"
          onClick={() => window.history.back()}
          icon={ChevronLeftIcon}
          className="inline-flex items-center rounded-lg px-4 py-2.5 font-semibold !bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 text-white transition-all duration-300 hover:scale-105"
          disabled={false}
        />
        <div className="flex items-center hidden lg:flex">
          <h1 className="text-3xl font-bold text-white mr-2 lg:mr-8">{list.name}</h1>
          <span className="inline-flex items-center px-4 py-2.5 text-base font-semibold rounded-full bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-md">
            {list.posts_ids.length} posts
          </span>
        </div>
          <div className="flex items-center"><UserMenu transparent />
          </div>
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
