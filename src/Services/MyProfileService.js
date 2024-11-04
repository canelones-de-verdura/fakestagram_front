import ApiService from "./ApiService";

const MyProfileService = {

    postImage: async (caption, image) => {
        const upload = {
            caption: caption,
            image: image
        };

        const response = await ApiService.post(
            "api/posts/upload",
            upload.caption,
            "application/json"
        );

        return response;
    }
}