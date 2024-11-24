import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import EditProfileModal from "../../Components/EditProfileModal/EditProfileModal";
import AddImageModal from "../../Components/AddImageModal/AddImageModal";
import PostService from "../../Services/PostService";
import profileImageDefault from "../../Assets/profile.jpg";
import MyProfileService from "../../Services/MyProfileService";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Atributos/Estados del perfil de usuario
  const [followers, setFollowers] = useState(user.followers || 3);
  const [following, setFollowing] = useState(user.following || 2);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [userName, setUserName] = useState(user.username);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || profileImageDefault);
  const [posts, setPosts] = useState([]);
  const [postQuantity, setPostQuantity] = useState(0);

  // Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await PostService.get_feed(user.token);
        console.log(response);
        // Aquí accedemos correctamente a los posts en `response.data`
        setPosts(response.data);
        setPostQuantity(response.data.length);
      } catch (error) {
        console.log("TOKEN: " + user.token);
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [user.token]);

  const handleEditProfile = async (updatedUser) => {
    setName(updatedUser.name);
    setBio(updatedUser.bio);
    setUserName(updatedUser.userName);
    setProfilePicture(updatedUser.profilePicture);
    //Chequeo del objeto
    console.log("user props: " + JSON.stringify(updatedUser));
    //PARTE DEL BACK
    await MyProfileService.editProfile(
      updatedUser.userName,
      updatedUser.name,
      updatedUser.bio,
      updatedUser.profilePicture,
      user.token
    );
  };

  const onSaveImage = async ({ image, file, caption }) => {
    try {
      const newPost = await PostService.upload_post(file, caption, user.token);
      setPosts((prevPosts) => [...prevPosts, newPost.data]);
      setPostQuantity((prevQuantity) => prevQuantity + 1);
    } catch (error) {
      console.error("Error uploading post:", error);
    }
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
        {posts.map((post) => (
          <div key={post._id} className="post-item">
            <img
              src={`http://localhost:3001/${post.imageUrl.replace("\\", "/")}`}
              alt={post.caption || "Post"}
              className="post-image"
            />
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
