
import Image from 'next/image';
import ListActionsDropdown from "../lists/listActions";
import { useRouter } from 'next/navigation';
import { IPost, PostWithList } from '../../app/interfaces/post';
import { IList } from '../../app/interfaces/list';
import { KeyedMutator } from 'swr';


export const Post = ({ post, lists, update, postsUpdate }: { post: PostWithList, lists: IList[], update: KeyedMutator<IList[]>, postsUpdate: KeyedMutator<IPost[]> }) => {
    const router = useRouter();

    return (
        <div key={post.post_id} className="group">
            <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800">
                <Image
                    alt={post.id}
                    src={post.display_url}
                    width={500}
                    height={500}
                    className="w-full object-cover group-hover:scale-105 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square cursor-pointer transition-transform duration-300"
                    onClick={() => router.push(`/post/${post.id}`)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    {post.lists?.map((name) => (
                        <span key={name} className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full text-white bg-gradient-to-r from-yellow-500 to-orange-500 backdrop-blur-sm shadow-lg border border-white/20">
                            {name}
                        </span>
                    ))}
                </div>
                <div className="absolute top-2 right-2">
                    <ListActionsDropdown dbPostId={post.id} postId={post.post_id} lists={lists} refreshPostFn={update} refreshPostsFn={postsUpdate} />
                </div>
            </div>
            <p className="mt-3 text-sm line-clamp-3 text-gray-700 dark:text-gray-300 px-2">{post.caption}</p>
        </div>
    )
};