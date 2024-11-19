import React from "react";
import { useEffect, useState } from "react";
import ImageComponent from "./ImageComponent";
import origin_url from "../Services/Origin";
import ProfilePhoto from "./ProfilePhoto";
import Heart from "react-animated-heart";
import LikeService from "../Services/LikeService";
import CommentComponent from "./CommentComponent";
import { useNavigate } from "react-router-dom";

import "./postFeed.css";
import MapComment from "../Models/CommentModel";

const Post = ({ post, modalSetOpen, commentsArray }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [currentPost] = useState(post);
    const navigate = useNavigate();
    const [liked, setLiked] = useState(
        currentPost.likes && currentPost.likes.some((like) => like === user._id) // verifica si ya se dio el like
    );
    const [likesCount, setLikesCount] = useState(
        currentPost.likes ? currentPost.likes.length : 0
    );  
    const [showHeart, setShowHeart] = useState(false);

    const handlerLike = async () => {
      try {
        if (!liked) {
          // Dar like
          await LikeService.like_post(post._id, user.token);
          setLikesCount((prevLikes) => prevLikes + 1);
        } else {
          // Quitar like
          await LikeService.remove_like(post._id, user.token);
          setLikesCount((prevLikes) => prevLikes - 1);
        }
        setLiked(!liked);
      } catch (error) {
        console.error("Error al gestionar el like:", error);
      }
    };

    const handleDoubleClick = () => {
      if (!liked) {
        handlerLike(); // Si no está likeado, cuenta como like
      }
      setShowHeart(true); // Mostrar el corazón animado grande
      setTimeout(() => setShowHeart(false), 1500); // Ocultar tras 1500 ms
    };

    const openComments = () => {
        modalSetOpen(true);
        const comm = currentPost.comments.map((comment) => MapComment(comment));
        commentsArray({ postID: currentPost._id, comments: comm });
    };

    return (
      <>
        <div className="imgContainer">
          <div className="userInfo">
            <div className="nomImgContainer">
              <button
                className="buttonNavv"
                onClick={() => navigate("/profile")}
              >
                <ProfilePhoto
                  profilePicture={user.profilePicture}
                  username={user.username}
                />
                <p id="nomUsuario">{currentPost.user.username}</p>
              </button>
            </div>
            <button id="optionsButton">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          {/* Imagen principal del post */}
          <div className="imageWrapper" onDoubleClick={handleDoubleClick}>
            <ImageComponent
              image={`${origin_url}/${currentPost.imageUrl}`}
              alt_text={currentPost.user.userName}
            />
            {showHeart && (
              <div className="animatedHeartOverlay">
                <Heart isClick={true} onClick={() => {}} />
              </div>
            )}
          </div>
        </div>
        <div className="interactionContainer">
          <div className="likeCommentContainer">
            {" "}
            <div className="likeContainer">
              <Heart
                isClick={liked}
                onClick={handlerLike}
                className="smallHeart"
              />
            </div>
            <span className="material-symbols-outlined" onClick={openComments}>
              chat_bubble
            </span>
          </div>
          <div className="likesCount">
            <span>{likesCount} Likes</span>
          </div>
          <div className="detailsContainer">
            <div className="descriptionContainer">
              <p id="nomUsuario">{currentPost.user.username}</p>
              <p id="description">{currentPost.caption}</p>
            </div>
          </div>
          <div className="commentsPreview">
            {currentPost.comments.slice(0, 2).map((comment, index) => (
              <CommentComponent key={index} comment={comment} />
            ))}
          </div>
        </div>
      </>
    );
};

export default Post;
