enum MediaType {
    video = 'Video',
}

export type IPost = {
    id: string;
    account_username: string;
    post_id: string;
    media_type: MediaType;
    caption: string;
    hashtags: string[];
    url: string;
    display_url: string;
    video_url?: string;
    images: string[];
    created_at: string;
}

export type PostWithList = IPost & { lists?: string[] };