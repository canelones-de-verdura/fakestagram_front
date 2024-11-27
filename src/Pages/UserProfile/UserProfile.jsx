/*UserProfile.jsx*/ 
import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import EditProfileModal from "../../Components/EditProfileModal/EditProfileModal";
import AddImageModal from "../../Components/AddImageModal/AddImageModal";
import PostService from "../../Services/PostService";
import profileImageDefault from "../../Assets/profile.jpg";
import MyProfileService from "../../Services/MyProfileService";
import Sidebar from "../../Components/SideBar";
import { useLocation } from "react-router-dom";
import ProfileService from "../../Services/ProfileService";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const {user_id} = location.state || {};
    console.log(user_id)

  // Atributos/Estados del perfil de usuario
  const [followers, setFollowers] = useState(user.followers || 3);
  const [following, setFollowing] = useState(user.following || 2);
  const [name, setName] = useState();
  const [bio, setBio] = useState();
  const [userName, setUserName] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [posts, setPosts] = useState([]);
  const [postQuantity, setPostQuantity] = useState(0);

  // Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await ProfileService.get_profile(user_id, user.token);
        console.log(response);
        // Aquí accedemos correctamente a los posts en `response.data`
        setPosts(response.data.posts);
        setPostQuantity(response.data.posts.length);
        setName(response.data.user.name)
        setProfilePicture(response.data.user.profilePicture || profileImageDefault)
        setBio(response.data.user.description)
        setUserName(response.data.user.username);
      } catch (error) {
        console.log("TOKEN: " + user.token);
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [user_id]);

  const handleEditProfile = async (updatedUser) => {
    try {
      // Actualiza el perfil en el backend
      await MyProfileService.editProfile(
        updatedUser.userName,
        updatedUser.name,
        updatedUser.bio,
        updatedUser.profilePicture,
        user.token
      );
    
      // Actualiza los estados locales
      setName(updatedUser.name);
      setBio(updatedUser.bio);
      setUserName(updatedUser.userName);
      setProfilePicture(updatedUser.profilePicture); // Cambia la imagen de perfil
  
      // Actualiza el localStorage con los nuevos datos del perfil (esto es para arreglar el problema de que los cambios que hechos en el front-end (como editar el perfil de usuario) no se guardan en el localStorage, por lo que cuando recargamos la página, la información vuelve a ser la que está almacenada en el localStorage y no la que modificamos temporalmente en el front-end, porque hasta no logearnos de nuevo el local storage no se actualiza.
      const updatedUserForStorage = {
        ...user,
        name: updatedUser.name,
        bio: updatedUser.bio,
        userName: updatedUser.userName,
        profilePicture: updatedUser.profilePicture,
      };
      localStorage.setItem("user", JSON.stringify(updatedUserForStorage)); // Actualiza el localStorage
  
      console.log("Perfil actualizado:", updatedUser);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };
  
  

  const onSaveImage = async ({ image, file, caption }) => {
    try {
      // Llamada al backend para guardar la imagen y obtener la URL persistente
      const response = await MyProfileService.postImage(caption, file, user.token);
  
      
      const newPost = response.data;//Este es el nuevo post que acabamos de subir
  
      // Actualizamos las imagenes del usuario en el front (las re-desplegamos)
      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      setPostQuantity(updatedPosts.length);
  
      console.log("Imagen subida correctamente:", newPost);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };
  

  return (
    <div className="profile-container">
      <Sidebar></Sidebar>
      <div className="profile-header">
        <img
          className="profile-pic"
          src={profilePicture ? `${profilePicture}` : profileImageDefault}
          alt={`${userName}'s profile`}
        />
        <div className="profile-info">
          <div className="profile-username">
            <h2>{userName}</h2>
            {(user._id === user_id) ? <button
              className="edit-profile-btn"
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </button>: <></>}
            {(user._id === user_id) ?<button
              className="edit-profile-btn"
              onClick={() => setIsImageModalOpen(true)}
            >
              Add Post
            </button> : <></>}
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
          <div key={post._id} className="hotFix">
            <img
              src={`http://localhost:3001/${post.imageUrl.replace("\\", "/")}`}
              alt={post.caption || "Post"}
            />
          </div>
        ))}
      </div>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={{ name, bio, userName, profilePicture }}
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
