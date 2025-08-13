
import Image from 'next/image';
import ListActionsDropdown from "../lists/listActions";
import { useRouter } from 'next/navigation';
import { IPost, PostWithList } from '../../app/interfaces/post';
import { IList } from '../../app/interfaces/list';
import { KeyedMutator } from 'swr';


export const Post = ({ post, lists, update, postsUpdate }: { post: PostWithList, lists: IList[], update: KeyedMutator<IList[]>, postsUpdate: KeyedMutator<IPost[]> }) => {
    const router = useRouter();

    return (
        <div key={post.post_id} className="group py-2">
            <div className="relative">
                <Image
                    alt={post.id}
                    src={post.display_url}
                    width={500}
                    height={500}
                    className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square cursor-pointer"
                    onClick={() => router.push(`/post/${post.id}`)}
                />
                <div className="absolute top-1 left-1">
                    {post.lists?.map((name) => (
                        <span key={name} className="inline-flex items-center px-2 py-1 text-s font-medium z-10 rounded-full px-3 py-1.5 font-medium text-white bg-yellow-600 bg-opacity-50 border-2 border-white m-1">
                            {name}
                        </span>
                    ))}
                </div>
                <div className="absolute top-1 right-1">
                    <ListActionsDropdown dbPostId={post.id} postId={post.post_id} lists={lists} refreshPostFn={update} refreshPostsFn={postsUpdate} />
                </div>
            </div>
            <p className="text-base line-clamp-3 text-gray-600">{post.caption}</p>
        </div>
    )
};