import React, { useState, useEffect } from "react";
import "./AddImage.css";

const AddImageModal = ({ isOpen, onClose, onSave }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState();

  useEffect(() => {
    if (!isOpen) {
      // Limpiar los estados cuando el modal se cierra (no funciona bien)
      setImage(null);
      setCaption("");
      setFile(null);
    }
  }, [isOpen]);

  const handleImageChange = (e) => {
    const fileToUpload = e.target.files[0];
    if (fileToUpload) {
      setFile(fileToUpload);
      setImage(URL.createObjectURL(fileToUpload)); // Genera una URL temporal para previsualizar
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ image, file, caption });
    onClose();
  };

  if (!isOpen) return null;

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
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
        {image && <img src={image} alt="Preview" className="image-preview" />}
      </div>
    </div>
  );
};

export default AddImageModal;
