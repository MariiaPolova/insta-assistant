import { IPost } from "./post";

export type IList = {
    id: string;
    created_at: Date;
    name: string;
    posts_ids?: string[]
}

export type IListWithPosts = IList & {
    posts_ids?: IPost[]
}