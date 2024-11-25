/*UserProfile.jsx*/ 
import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import EditProfileModal from "../../Components/EditProfileModal/EditProfileModal";
import AddImageModal from "../../Components/AddImageModal/AddImageModal";
import PostService from "../../Services/PostService";
import profileImageDefault from "../../Assets/profile.jpg";
import MyProfileService from "../../Services/MyProfileService";
import Sidebar from "../../Components/SideBar";

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
  
      // Supongamos que `response.data` devuelve el nuevo post con la URL del servidor
      const newPost = response.data;
  
      // Actualizar el estado con el post recibido del servidor
      const updatedPosts = [...posts, newPost];
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
          <div key={post._id}>
            <img
              src={`http://localhost:3001/${post.imageUrl.replace("\\", "/")}`}
              alt={post.caption || "Post"}
              className="hotFix"
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
