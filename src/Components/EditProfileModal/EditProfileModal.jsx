import React, { useState } from 'react';
import './EditProfileModal.css';

const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
  console.log(user);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [userName, setUserName] = useState(user.userName);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...user, name, bio, userName, profilePicture });
    onClose();
  };

  const handleImageChange = (e) => {
    setProfilePicture(e.target.value); // Almacena la URL directamente
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label>Bio:</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              value={profilePicture}
              onChange={handleImageChange} // Cambia al URL ingresado
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
        {/* Muestra la imagen solo si hay una URL válida */}
        {profilePicture && <img src={profilePicture} alt="Preview" className="image-preview" />}
      </div>
    </div>
  );
};

export default EditProfileModal;
