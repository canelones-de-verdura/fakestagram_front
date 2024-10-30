import React, { useState, useEffect } from "react";
import "./Feed.css";
import Post from "../Components/postFeed";
import { useNavigate } from "react-router-dom";
import PostService from "../Services/PostService";
import origin_url from "../Services/Origin";

const Feed = () => {
    // User
    const user = JSON.parse(localStorage.getItem("user"))

    // Para redireccionar
    const navigate = useNavigate();

  // Imágenes del feed
  const [posts, setPosts] = useState([]); // Estado para almacenar las imagenes
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [newImage, setNewImage] = useState(null); // Estado para la imagen
  const [caption, setCaption] = useState(""); // Estado para el comentario

  useEffect(() => {
      const fetchImages = async () => {
          const res = await PostService.get_feed(user.token) // Falta token

          if (res.code === 200)
              setPosts(res.data);
      };

      fetchImages();
  }, []);

  const handlerProfile = () => {
      navigate("/profile");
  };



    const handleAddBoxClick = () => {
        setIsModalOpen(true); // Abre el modal
    };

    const handleImageChange = (e) => {
        setNewImage(e.target.files[0]); // Guarda la imagen seleccionada
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value); // Guarda el comentario
    };

    const handleUploadPost = async () => {
        if (newImage && caption) {
            const res = await PostService.upload_post(newImage, caption, user.token);
            if (res.code === 200) {
                setPosts([...posts, res.data]); // Agrega el nuevo post al feed
                setIsModalOpen(false); // Cierra el modal
            }
        }
    };

    useEffect(() => {
        document.body.classList.add("feed-background");
        document.getElementById("root").classList.add("feed-root");

    return () => {
      document.body.classList.remove("feed-background");
      document.getElementById("root").classList.remove("feed-root");
    };
  }, []);

    return (
        <>
            <div className="feedContainer">
                <div className="feedHeader">
                    <h2>Fakestagram</h2>
                    <div className="iconos">
                    <button className="icon-button" onClick={() => {/* Acción para el botón favorite */}}>
                        <span className="material-symbols-outlined" style={{ color: 'initial' }}>
                            favorite
                        </span>
                    </button>
                    <button className="icon-button" onClick={handleAddBoxClick}>
                        <span className="material-symbols-outlined" onClick={handleAddBoxClick} style={{ color: 'initial' }}>
                            add_box
                        </span>
                    </button>
                    </div>
                </div>

                <div className="postContainer">
                    {posts.map((post, key) => {
                        return <Post
                            key={key}
                            nomUsuario={post.user.username}
                            profileImg={`${origin_url}/${post.user.profilePicture}`}
                            img={`${origin_url}/${post.imageUrl}`}
                            description={post.caption}
                        />
                    })}
                </div>
                <div className="navContainer">
                    <button className="buttonNav">
                        <span className="imgNav material-symbols-outlined">
                            home
                        </span>
                    </button>
                    <button onClick={handlerProfile} className="buttonNav">
                        <img
                            className="imgNav"
                            src={`${origin_url}/${user.profilePicture}`}
                        />
                    </button>
                </div>
            </div>

             {/* Modal para subir nueva imagen */}
             {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Subir nueva imagen</h3>
                        <input type="file" onChange={handleImageChange} accept="image/*" />
                        <textarea
                            placeholder="Agrega un comentario..."
                            value={caption}
                            onChange={handleCaptionChange}
                        />
                        <button onClick={handleUploadPost}>Subir</button>
                        <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Feed;
