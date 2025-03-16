
import Image from 'next/image';
import ListActionsDropdown from "../lists/listActions";
import { useRouter } from 'next/navigation';
import { PostWithList } from '../../app/interfaces/post';
import { IList } from '../../app/interfaces/list';
import { KeyedMutator } from 'swr';


export const Post = ({ post, lists, update }: { post: PostWithList, lists: IList[], update: KeyedMutator<IList[]> }) => {
    const router = useRouter();

    return (
        <div key={post.post_id} className="group py-2">
            <div className="relative">
                <Image
                    alt={post.id}
                    src={post.display_url}
                    width={500}
                    height={500}
                    className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square"
                    onClick={() => router.push(`/post/${post.id}`)}
                />
                <div className="absolute top-1 left-1">
                    {post.lists?.map((name) => (
                        <span key={name} className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-s font-medium text-blue-800 ring-1 ring-inset ring-blue-600/20 m-1">
                            {name}
                        </span>
                    ))}
                </div>
                <div className="absolute top-1 right-1">
                    <ListActionsDropdown postId={post.post_id} lists={lists} refreshFn={update} />
                </div>
            </div>
            <div className="mt-6 text-sm">
                {post.hashtags.map((hashtag, i) => (
                    <span key={`${hashtag}-${i}}`} className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20 m-1">
                        {hashtag}
                    </span>
                ))}
            </div>
            <p className="text-base line-clamp-3 text-gray-600">{post.caption}</p>
        </div>
    )
};