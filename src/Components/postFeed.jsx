import React from "react"
import "./postFeed.css";

const postFeed = ({nomUsuario, profileImg, img}) =>{

    return (
        <div className="postContainer">   
            <div className="userInfo">   
                <img src={profileImg} alt={`${nomUsuario} avatar`}/>
                <p>{nomUsuario}</p>
                <button>•••</button>
            </div>
            <div className="imgContainer">
                <img src={img} alt={`${nomUsuario} imagen`} />           
            </div>
            <div className="interactionConteiner">   
                
            </div>
        </div>
    )
}