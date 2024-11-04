import React, { useState, useEffect } from "react";
import "./Feed.css";
import Post from "../Components/postFeed";
import { useNavigate } from "react-router-dom";
import PostService from "../Services/PostService";
import origin_url from "../Services/Origin";
import PostModal from "../Components/PostModal";

const Feed = () => {
    // User
    const user = JSON.parse(localStorage.getItem("user"))

    // Para redireccionar
    const navigate = useNavigate();

    // Imágenes del feed
    const [posts, setPosts] = useState([]); // Estado para almacenar las imagenes

    // Para abrir/cerrar los posts
    const [open, setOpen] = useState(true);

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
                        <span className="material-symbols-outlined">
                            favorite
                        </span>
                        <span className="material-symbols-outlined">
                            add_box
                        </span>
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
            <PostModal open={open} setOpen={setOpen} />
        </>
    );
};

export default Feed;
