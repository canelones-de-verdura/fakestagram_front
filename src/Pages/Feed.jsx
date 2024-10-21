import React, {useState, useEffect} from "react";
import "../Pages/Feed.css";

//import AuthService from "../Services/AuthService";

const Feed = () => {
    const [imagenes, setImagenes] = useState([]); // Estado para almacenar las imagenes


    return (
        <>
            <div className="feedcontainer">   
                <h2>Fakestagram</h2>
                <div className="statusBar">

                </div>
                <div className="interactionDetails">
                        
                </div>
            </div>
        </>
    )
}

export default Feed;