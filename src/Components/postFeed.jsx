import React from "react"
import "./postFeed.css";

const Post = ({ nomUsuario, profileImg, img, likes }) => {

    return (
        <>
            <div className="userInfo">
                <div className="nomImgContainer">
                    <img src={profileImg} alt={`${nomUsuario} avatar`} />
                    <p id="nomUsuario">{nomUsuario}</p>
                </div>
                <button id="optionsButton">...</button>
            </div>
            <div className="imgContainer">
                <img id="imgPost" src={img} alt={`${nomUsuario} imagen`} />
            </div>
            <div className="interactionConteiner">
                <span className="icon-heart">♡</span>
                <span className="icon-comment">💬</span>
            </div>
            <div className="detailsContainer">

            </div>
        </>
    )
}

export default Post;