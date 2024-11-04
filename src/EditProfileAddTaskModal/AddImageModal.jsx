// EditProfileModal.tsx
import React, { useState } from 'react';
import './AddImage.css'

const AddImageModal = ({ isOpen, onClose, onSave }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ image, caption }); // Llama a onSave para guardar la imagen y el comentario
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Post</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <div>
            <label>Caption:</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
        {image && <img src={image} alt="Preview" className="image-preview" />}
      </div>
    </div>
  );
};

export default AddImageModal;
