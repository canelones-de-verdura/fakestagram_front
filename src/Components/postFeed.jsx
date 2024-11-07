import { useState } from "react";
import ImageComponent from "./ImageComponent";
import origin_url from "../Services/Origin";
import ProfilePhoto from "./ProfilePhoto";
import Heart from "react-animated-heart";

import "./postFeed.css";

const Post = ({ post, modalSetOpen, commentsArray }) => {
    const [currentPost] = useState(post);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likes ? post.likes.length : 0); 
    
    const handlerLike = () => {
        setLiked(!liked); 
        setLikesCount((prevLikes) => liked ? prevLikes - 1 : prevLikes + 1);
    };


    const openComments = () => {
        modalSetOpen(true)
        commentsArray({ postID: currentPost._id, comments: currentPost.comments})
    }

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

          <span className="material-symbols-outlined">chat_bubble</span>
        </div>
        <div className="detailsContainer">
          <div className="likes">{currentPost.likes}</div>
          <div className="descriptionContainer">
            <p id="nomUsuario">{currentPost.user.username}</p>
            <p id="description">{currentPost.caption}</p>
          </div>
        </div>
      </>
    );
}

export default Post;
