import ImageComponent from "./ImageComponent";

import "./postFeed.css";

const Post = ({ nomUsuario, profileImg, img, likes, description }) => {

    const likesCount = Array.isArray(likes) ? likes.length : 0;
    const handlerLike = () => {

    }

    return (
        <>
            <div className="userInfo">
                <div className="nomImgContainer">
                    <img src={profileImg} alt={`${nomUsuario} avatar`} />
                    <p id="nomUsuario">{nomUsuario}</p>
                </div>
                <button id="optionsButton">
                    <span className="material-symbols-outlined">
                        more_vert
                    </span>
                </button>
            </div>
            <div className="imgContainer">
                <ImageComponent image={img} alt_text={nomUsuario} />
            </div>
            <div className="interactionContainer">
                <div className="likeContainer">
                    <span className="material-symbols-outlined detailsItems" onClick={handlerLike}>
                        favorite
                    </span>
                    <span className="likesCount">{likesCount}</span>
                </div>
                <span className="material-symbols-outlined detailsItems">
                    comment
                </span>
            </div>
            <div className="detailsContainer">
                <div className="descriptionContainer">
                    <p id="nomUsuario">{nomUsuario}</p>
                    <p id="description">{description}</p>
                </div>
            </div>
        </>
    )
}

export default Post;
