import ApiService from "./ApiService"

const PostService = {
    upload_post: async (image, caption, token) => {
        const post = {
            image: image,
            caption: caption,
        };

        const res = await ApiService.post(
            "posts/upload",
            post,
            "multipart/form-data",
            token
        );

        return res;
    },

    get_feed: async (token) => {
        const res = await ApiService.get(
            "posts/feed",
            token
        );

        return res;
    },

    comment_post: async (comment, post_id, token) => {
        const res = await ApiService.post(
            `posts/${post_id}/comments`,
            comment,
            "application/json",
            token
        );

        return res;
    },

    like_post: async (post_id, token) => {
        const res = await ApiService.post(
            `posts/${post_id}/comments`,
            null,
            null,
            token
        );

        return res;
    },
};

export default PostService;
