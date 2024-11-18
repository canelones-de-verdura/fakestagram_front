//UserProfile.jsx
import React, { useEffect, useState } from "react";
import "./UserProfile.css";
//import EditProfileModal from "../EditProfileModal/EditProfileModal";
//import AddImageModal from "../../EditProfileAddTaskModal/AddImageModal";
//import MyProfileService from "../../Services/MyProfileService";
import ProfileService from "../Services/ProfileService";
import origin_url from "../Services/Origin";
import ProfilePhotoInProfile from "../Components/ProfilePhotoInProfile";

const UserProfile = ({ user }) => {
    const current_user = JSON.parse(localStorage.getItem("user"));
    const [user_profile, setProfile] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            let user_id;

            if (!user)
                user_id = current_user._id;
            else
                user_id = user._id;

            const res = await ProfileService.get_profile(user_id, current_user.token);

            if (res.code === 200) {
                setProfile(res.data);
            }
        }

        getProfile();
    }, []);

    if (!user_profile)
        return;
//
//
//
//    //Atributos/Estados del perfil de usuario
//    //const [followers, setFollowers] = useState(user.followers);
//    //const [following, setFollowing] = useState(user.following);
//    const [name, setName] = useState(user_profile.user.userName);
//    const [postQuantity, setPostQuantity] = useState(user_profile.user.posts.length);
//    //const [bio, setBio] = useState(user.bio);
//    const [userName, setUserName] = useState(user_profile.user.userName);
//    const [posts, setPosts] = useState(user_profile.user.posts);
//    const [profilePicture, setProfilePicture] = useState(user_profile.user.profilePicture);
//
//    //Modales
//    //const [isModalOpen, setIsModalOpen] = useState(false);
//    //const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//    //
//    //const handleEditProfile = async (updatedUser) => {
//    //    setName(updatedUser.name);
//    //    setBio(updatedUser.bio);
//    //    setUserName(updatedUser.userName);
//    //    setProfilePicture(updatedUser.profilePicture);
//    //    console.log("user props: " + JSON.stringify(updatedUser));
//    //    await MyProfileService.editProfile(updatedUser.userName, updatedUser.name, updatedUser.bio, updatedUser.profilePicture, token);
//    //};
//    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MmI1Y2EwZjgwMWJjNDNkYjI3MGQ2MSIsImlhdCI6MTczMTQzNDgzOSwiZXhwIjoxNzM0MDI2ODM5fQ.YOuP4lSIBF-Yo4L-aR2qnBHOkVP5oM_wHThSJJX6RYw";//token de prueba
//    //
//    //const onSaveImage = async ({ image, file, caption }) => { //image es para la previsualización el modal y file para guardar la imagen en la bd
//    //    const newPost = { imageUrl: image }; //Aca el caption no v
//    //    const updatedPosts = [...posts, newPost];
//    //    setPosts(updatedPosts);
//    //    setPostQuantity(updatedPosts.length);
//    //    console.log("ASI SE VE EL POST" + file);
//    //    await MyProfileService.postImage(
//    //        caption,
//    //        file,
//    //        token /*userBackend.token*/
//    //    );
//    //};
//
    console.log(user_profile)
    return (
        <div className="profile-container">
            <div className="profile-header">
                <ProfilePhotoInProfile username={user_profile.user.username} profilePicture={user_profile.user.profilePicture} />
                <div className="profile-info">
                    <div className="profile-username">
                        <h2>{user_profile.user.username}</h2>
                        <button
                            className="edit-profile-btn"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Edit Profile
                        </button>
                        <button
                            className="edit-profile-btn"
                            onClick={() => setIsImageModalOpen(true)}
                        >
                            Add Post
                        </button>
                    </div>
                    <div className="profile-stats">
                        <p>
                            <strong>{user_profile.posts.length}</strong> posts
                        </p>
                        <p>
                            <strong>{user_profile.user.friends.length}</strong> friends
                        </p>
                    </div>
                </div>
            </div>
            <div className="profile-gallery">
                {user_profile.posts.map((post, index) => (
                    <div key={index}> {/*le borre aca la  className="gallery-item" porque tras meter el hotFix no hacia nada*/}
                        <img src={`${origin_url}/${post.imageUrl}`} alt={`Post ${index}`} className="hotFix" />
                        <p>{post.caption}</p>
                    </div>
                ))}
            </div>

            {/*<EditProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={{ user_profile.user.name, bio, userName }}
                onSave={handleEditProfile}
            />

            <AddImageModal
                isOpen={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
                onSave={onSaveImage}
            />*/}
        </div>
    );
};

export default UserProfile;
