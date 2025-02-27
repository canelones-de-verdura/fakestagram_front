import profile from "../Assets/profile.jpg";
import origin_url from "../Services/Origin";
import "./ProfilePhoto.css"
import { useNavigate } from "react-router-dom";

const ProfilePhoto = ({profilePicture, username}) => {
    const imageUrl =
 profilePicture ? `${profilePicture}` : profile;
    return (
      <div className="profilePhotoContainer">
        <img className="imgProfile" src={imageUrl} alt={`${username} avatar`} />
      </div>
    );
}

export default ProfilePhoto;