import { useState } from "react";
import ImageComponent from "./ImageComponent";
import origin_url from "../Services/Origin";

import "./postFeed.css";

const Post = ({ post, modalSetOpen, commentsArray }) => {
    const [currentPost, setCurrentPost] = useState(post)

    const likesCount = Array.isArray(post.likes) ? post.likes.length : 0;
    const handlerLike = () => {
    }
    const openComments = () => {
        modalSetOpen(true)
        commentsArray({ postID: currentPost._id, comments: currentPost.comments})
    }

    return (
        <>
            <div className="userInfo">
                <div className="nomImgContainer">
                    <img src={`${origin_url}/${currentPost.user.profilePicture}`} alt={`${currentPost.user.username} avatar`} />
                    <p id="nomUsuario">{currentPost.user.username}</p>
                </div>
                <button id="optionsButton">
                    <span className="material-symbols-outlined">
                        more_vert
                    </span>
                </button>
            </div>
            <div className="imgContainer">
                <ImageComponent image={`${origin_url}/${currentPost.imageUrl}`} alt_text={currentPost.user.userName} />
            </div>
            <div className="interactionContainer">
                <div className="likeContainer">
                    <span className="material-symbols-outlined detailsItems" onClick={handlerLike}>
                        favorite
                    </span>
                    <span className="likesCount">{likesCount}</span>
                </div>
                <span className="material-symbols-outlined detailsItems" onClick={openComments}>
                    comment
                </span>
            </div>
            <div className="detailsContainer">
                <div className="descriptionContainer">
                    <p id="nomUsuario">{currentPost.user.username}</p>
                    <p id="description">{currentPost.caption}</p>
                </div>
            </div>
        </>
    )
}

export default Post;
