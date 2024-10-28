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
                <img id="imgPost" src={img} alt={`${nomUsuario} imagen`} />
            </div>
            <div className="interactionContainer">
                <span className="detailsItems">❤️</span>
                <span className="detailsItems">💬</span>
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
