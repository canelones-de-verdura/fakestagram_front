import ImageComponent from "./ImageComponent";

import "./postFeed.css";

const Post = ({ nomUsuario, profileImg, img, likes, description }) => {
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
                <span className="material-symbols-outlined detailsItems">
                    favorite
                </span>
                <span className="material-symbols-outlined detailsItems">
                    comment
                </span>
            </div>
            <div className="detailsContainer">
                <div className="likes">
                    {likes}
                </div>
                <div className="descriptionContainer">
                    <p id="nomUsuario">{nomUsuario}</p>
                    <p id="description">{description}</p>
                </div>
            </div>
        </>
    )
}

export default Post;
