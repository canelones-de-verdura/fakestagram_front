import React, { useState } from "react";
import "./UserProfile.css";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import AddImageModal from "../../EditProfileAddTaskModal/AddImageModal";
import MyProfileService from "../../Services/MyProfileService";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ user }) => {
  const navigate = useNavigate(); // Declarar el hook dentro del componente

  const handleNavigate = () => {
    navigate('/login'); // Redirige al login, es de prueba para que funcione pero una vez integrado llevaria al feed
  };

  // Atributos/Estados del perfil de usuario
  const userBackend = JSON.parse(localStorage.getItem("user"));
  const [followers, setFollowers] = useState(user.followers);
  const [following, setFollowing] = useState(user.following);
  const [name, setName] = useState(user.name);
  const [postQuantity, setPostQuantity] = useState(user.posts.length);
  const [bio, setBio] = useState(user.bio);
  const [userName, setUserName] = useState(user.userName);
  const [posts, setPosts] = useState(user.posts);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);

  // Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleEditProfile = async (updatedUser) => {
    setName(updatedUser.name);
    setBio(updatedUser.bio);
    setUserName(updatedUser.userName);
    setProfilePicture(updatedUser.profilePicture);
    console.log("user props: " + JSON.stringify(updatedUser));
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MmI1Y2EwZjgwMWJjNDNkYjI3MGQ2MSIsImlhdCI6MTczMTQzNDgzOSwiZXhwIjoxNzM0MDI2ODM5fQ.YOuP4lSIBF-Yo4L-aR2qnBHOkVP5oM_wHThSJJX6RYw"; // token de prueba
    await MyProfileService.editProfile(
      updatedUser.userName,
      updatedUser.name,
      updatedUser.bio,
      updatedUser.profilePicture,
      token
    );
  };

  const onSaveImage = async ({ image, file, caption }) => {
    const newPost = { imageUrl: image };
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    setPostQuantity(updatedPosts.length);
    console.log("ASI SE VE EL POST " + file);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MmI1Y2EwZjgwMWJjNDNkYjI3MGQ2MSIsImlhdCI6MTczMTQzNDgzOSwiZXhwIjoxNzM0MDI2ODM5fQ.YOuP4lSIBF-Yo4L-aR2qnBHOkVP5oM_wHThSJJX6RYw"; // token de prueba
    await MyProfileService.postImage(caption, file, token);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          className="profile-pic"
          src={profilePicture}
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
            <button className="goFeed_btn" onClick={handleNavigate}>
              Go Feed
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
          <div key={index}>
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
