//UserProfile.jsx
import React, { useState } from "react";
import "./UserProfile.css";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import AddImageModal from "../../EditProfileAddTaskModal/AddImageModal";
import MyProfileService from "../../Services/MyProfileService";

const UserProfile = ({ user }) => {
  const userBackend = JSON.parse(localStorage.getItem("user"));
  const [followers, setFollowers] = useState(user.followers);
  const [following, setFollowing] = useState(user.following);
  const [name, setName] = useState(user.name);
  const [postQuantity, setPostQuantity] = useState(user.posts.length);
  const [bio, setBio] = useState(user.bio);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState(user.userName);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [posts, setPosts] = useState(user.posts);

  const handleEditProfile = (updatedUser) => {
    setName(updatedUser.name);
    setBio(updatedUser.bio);
    setUserName(updatedUser.userName);
  };

  const onSaveImage = async ({ image, file, caption }) => {
    const newPost = { imageUrl: image }; //Aca el caption no va
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    setPostQuantity(updatedPosts.length);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MmI1Y2EwZjgwMWJjNDNkYjI3MGQ2MSIsImlhdCI6MTczMDg5ODg3OCwiZXhwIjoxNzMzNDkwODc4fQ.BIGR41UO_XsA0mbaBW4k7G1m-VkqAbNcbwwEr_VBzaw"; //Token de prueba
    await MyProfileService.postImage(
      caption,
      file,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MmI1Y2EwZjgwMWJjNDNkYjI3MGQ2MSIsImlhdCI6MTczMDg5ODg3OCwiZXhwIjoxNzMzNDkwODc4fQ.BIGR41UO_XsA0mbaBW4k7G1m-VkqAbNcbwwEr_VBzaw" /*userBackend.token*/
    );
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          className="profile-pic"
          src={user.profilePicture}
          alt={`${userName}'s profile`}
        />
        <div className="profile-info">
          <div className="profile-username">
            <h2>{userName}</h2>
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
              <strong>{postQuantity}</strong> posts
            </p>
            <p>
              <strong>{followers}</strong> followers
            </p>
            <p>
              <strong>{following}</strong> following
            </p>
          </div>
          <div className="profile-bio">
            <p className="namee">{name}</p>
            <p>{bio}</p>
          </div>
        </div>
      </div>
      <div className="profile-gallery">
        {posts.map((post, index) => (
          <div key={index} className="gallery-item">
            <img src={post.imageUrl} alt={`Post ${index}`} className="hotFix" />
            <p>{post.caption}</p>
          </div>
        ))}
      </div>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={{ name, bio, userName }}
        onSave={handleEditProfile}
      />

      <AddImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onSave={onSaveImage}
      />
    </div>
  );
};

export default UserProfile;
