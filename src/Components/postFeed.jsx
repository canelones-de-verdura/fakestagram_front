import { useEffect, useState } from "react";
import ImageComponent from "./ImageComponent";
import origin_url from "../Services/Origin";
import ProfilePhoto from "./ProfilePhoto";
import Heart from "react-animated-heart";
import LikeService from '../Services/LikeService';

import "./postFeed.css";
import MapComment from "../Models/CommentModel";

const Post = ({ post, modalSetOpen, commentsArray }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [currentPost] = useState(post);
    const [liked, setLiked] = useState(
        currentPost.likes && currentPost.likes.some((like) => like === user._id) // verifica si ya se dio el like
    );
    const [likesCount, setLikesCount] = useState(currentPost.likes ? currentPost.likes.length : 0);

    const handlerLike = async () => {
        if (liked) {
            const res = await LikeService.remove_like(post._id, user.token);
            setLiked(!liked);
            setLikesCount((prevLikes) => liked ? prevLikes - 1 : prevLikes + 1);
        } else {
            const res = await LikeService.like_post(post._id, user.token);
            setLiked(!liked);
            setLikesCount((prevLikes) => liked ? prevLikes - 1 : prevLikes + 1);
        }
    };


    const openComments = () => {
        modalSetOpen(true);
        const comm = currentPost.comments.map(comment => MapComment(comment));
        commentsArray({ postID: currentPost._id, comments: comm });
    };

    return (
        <>
            <div className="userInfo">
                <div className="nomImgContainer">
                    <ProfilePhoto
                        profilePicture={currentPost.user.profilePicture}
                        username={currentPost.user.username}
                    />
                    <p id="nomUsuario">{currentPost.user.username}</p>
                </div>
                <button id="optionsButton">
                    <span className="material-symbols-outlined">more_vert</span>
                </button>
            </div>
            <div className="imgContainer">
                <ImageComponent
                    image={`${origin_url}/${currentPost.imageUrl}`}
                    alt_text={currentPost.user.userName}
                />
            </div>
            <div className="interactionContainer">
                <div className="likeContainer">
                    <Heart
                        isClick={liked}
                        onClick={handlerLike}
                        className="smallHeart"
                    />
                    <span className="likesCount">{likesCount}</span>
                </div>

                <span className="material-symbols-outlined"
                    onClick={openComments}>chat_bubble</span>
            </div>
            <div className="detailsContainer">
                <div className="descriptionContainer">
                    <p id="nomUsuario">{currentPost.user.username}</p>
                    <p id="description">{currentPost.caption}</p>
                </div>
            </div>
        </>
    );
};

export default Post;
