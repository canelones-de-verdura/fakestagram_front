import React, { useState } from 'react';
import './EditProfileModal.css';

const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [userName, setUserName] = useState(user.userName);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [file, setFile] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...user, name, bio, userName, file });
    onClose();
  };

  const handleImageChange = (e) => {
    const fileToUpload = e.target.files[0];
    if (fileToUpload) {
      setFile(fileToUpload);
      console.log("IMAGEN CONVERTIDA")
      console.log(fileToUpload);
      setProfilePicture(URL.createObjectURL(fileToUpload));
    }
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
            <label>Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
        {/* Solo muestra la imagen si se ha seleccionado una nueva */}
        {file && <img src={profilePicture} alt="Preview" className="image-preview" />}
      </div>
    </div>
  );
};

export default EditProfileModal;
