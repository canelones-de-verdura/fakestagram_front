import React, { useState } from 'react';
import './UserProfile.css';
import EditProfileModal from '../EditProfileModal/EditProfileModal';

const UserProfile = ({ user }) => {
  // Estados para el perfil
  const [followers, setFollowers] = useState(user.followers);
  const [following, setFollowing] = useState(user.following);
  const [name, setName] = useState(user.name);
  const [postQuantity, setPostQuantity] = useState(user.posts.length);
  const [bio, setBio] = useState(user.bio);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState(user.userName);

  // Función para manejar la edición del perfil
  const handleEditProfile = (updatedUser) => {
    setName(updatedUser.name);
    setBio(updatedUser.bio);
    setUserName(updatedUser.userName);
    // Aca creo que se puede actualizar el backend
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img className="profile-pic" src={user.profilePicture} alt={`${userName}'s profile`} />
        <div className="profile-info">
          <div className="profile-username">
            <h2>{userName}</h2>
            <button className="edit-profile-btn" onClick={() => setIsModalOpen(true)}>
              Edit Profile
            </button>
          </div>
          <div className="profile-stats">
            <p><strong>{postQuantity}</strong> posts</p>
            <p><strong>{followers}</strong> followers</p>
            <p><strong>{following}</strong> following</p>
          </div>
          <div className="profile-bio">
            <p className='namee'>{name}</p>
            <p>{bio}</p>
          </div>
        </div>
      </div>
      <div className="profile-gallery">
        {user.posts.map((post, index) => (
          <img key={index} className="gallery-item" src={post.imageUrl} alt={`Post ${index}`} />
        ))}
      </div>*/
      {/* Aquí se renderiza el modal */}
      /*<EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={{ name, bio, userName }} // Pasa el usuario actual (en realidad son los parametros que quiero cambiar del usuario)
        onSave={handleEditProfile} // Función para manejar la actualización
      />
    </div>
  );
};

export default UserProfile;
