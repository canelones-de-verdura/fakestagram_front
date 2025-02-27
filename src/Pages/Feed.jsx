import React, { useState, useEffect } from "react";
import "./Feed.css";
import Post from "../Components/postFeed";
import { useNavigate } from "react-router-dom";
import PostService from "../Services/PostService";
import origin_url from "../Services/Origin";
import Sidebar from "../Components/SideBar";
import PostModal from "../Components/PostModal";
import ProfilePhoto from "../Components/ProfilePhoto";
import Modal from "../Components/Modal";

const Feed = () => {
    // User
    const user = JSON.parse(localStorage.getItem("user"));

    // Para redireccionar
    const navigate = useNavigate();

    // Imágenes del feed
    const [posts, setPosts] = useState([]); // Estado para almacenar las imagenes


    // Para abrir/cerrar los comentarios
    const [openModal, setOpenModal] = useState(false);
    const [openWith, setOpenWith] = useState({}); // objeto con id del post + array de ids de comentarios

    //Logout
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };



    useEffect(() => {
        const fetchImages = async () => {
            const res = await PostService.get_feed(user.token) // Falta token


            if (res.code === 200) setPosts(res.data);
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
            <div className="feed-root">
                <Sidebar />
                <div className="feedContainer">
                    <div className="feedHeader">
                        <div className="title-feed">Fakestagram</div>
                        <div className="iconos">
                            <span className="material-symbols-outlined">favorite</span>
                            <span className="material-symbols-outlined">add_box</span>
                        </div>
                    </div>

                    <div className="postContainer">
                        {posts.map((post, key) => {
                            return (
                                <Post
                                    key={key}
                                    post={post}
                                    modalSetOpen={setOpenModal}
                                    commentsArray={setOpenWith}
                                />
                            );
                        })}
                    </div>

                    <div className="navContainer">
                        <button onClick={handleLogout} className="buttonNav">
                            <span className="imgNav material-symbols-outlined">logout</span>
                        </button>
                        <button onClick={handlerProfile} className="buttonNav">
                            <ProfilePhoto
                                profilePicture={user.profilePicture}
                                username={user.username}
                            />
                        </button>
                    </div>
                </div>
            </div>
            {openModal === true ?
                <Modal
                    onClose={() => setOpenModal(false)}
                    content={<PostModal comments={openWith} updateComments={setOpenWith} />}
                /> :
                <></>
            }
        </>
    );

};

export default Feed;
