
'use client'
import Image from 'next/image';
import ListActionsDropdown from "../lists/listActions";
import { useRouter } from 'next/navigation';
import { IPost, PostWithList } from '../../app/interfaces/post';
import { IList } from '../../app/interfaces/list';
import { KeyedMutator } from 'swr';


export const Post = ({ post, lists, update, postsUpdate }: { post: PostWithList, lists: IList[], update?: KeyedMutator<IList[]>, postsUpdate?: KeyedMutator<IPost[]> }) => {
    const router = useRouter();

    return (
        <div key={post.post_id} className="group">
            <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-800 border-2 border-transparent hover:border-blue-500/30 dark:hover:border-blue-400/30">
                <Image
                    alt={post.id}
                    src={post.display_url}
                    width={500}
                    height={500}
                    className="w-full object-cover group-hover:scale-110 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square transition-all duration-500 ease-out pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* List badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2 max-w-[calc(100%-80px)] z-10">
                    {post.lists?.map((name) => (
                        <span 
                            key={name} 
                            className="inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-full text-white bg-gradient-to-r from-amber-500 to-orange-600 backdrop-blur-lg shadow-xl border border-white/30 transform hover:scale-105 transition-all duration-300"
                        >
                            {name}
                        </span>
                    ))}
                </div>
                
                {/* Actions dropdown */}
                <div className="absolute top-3 right-3 opacity-80 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 transform lg:group-hover:scale-100 lg:scale-75 z-20">
                    <ListActionsDropdown dbPostId={post.id} postId={post.post_id} lists={lists} refreshPostFn={update} refreshPostsFn={postsUpdate} />
                </div>
                
                {/* View Details overlay button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 z-10">
                    <button
                        onClick={() => router.push(`/post/${post.id}`)}
                        className="px-6 py-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg text-gray-900 dark:text-white font-semibold rounded-xl shadow-2xl hover:bg-white dark:hover:bg-gray-700 transform hover:scale-105 transition-all duration-300 border border-white/30"
                        aria-label={`View details for ${post.caption || 'post'}`}
                    >
                        View Details
                    </button>
                </div>
                
                {/* Post info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 pointer-events-none z-5">                    <p className="text-white text-sm line-clamp-2 font-medium">
                        {post.caption}
                    </p>
                </div>
            </div>
            
            {/* Caption outside image */}
            <div className="mt-4 px-2">
                <p className="text-sm line-clamp-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {post.caption}
                </p>
            </div>
        </div>
    )
};