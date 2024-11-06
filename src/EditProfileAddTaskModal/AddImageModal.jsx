import React, { useState } from "react";
import "./AddImage.css";

const AddImageModal = ({ isOpen, onClose, onSave }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState();
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({image, file, caption }); // Llama a onSave para guardar la imagen y el comentario (el comentario igual no lo muestro)
    onClose();
  };

  const handleImageChange = (e) => {
    const fileToUpload = e.target.files[0];
    if (fileToUpload) {
      setFile(fileToUpload);
      setImage(URL.createObjectURL(fileToUpload)); // Genera una URL temporal para previsualizar
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
