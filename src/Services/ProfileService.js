import ApiService from "./ApiService";

const ProfileService = {
    get_profile: async (user_id) => {
        const res = await ApiService.get(`api/user/profile/${user_id}`);

        return res;
    }
};

export default ProfileService;
