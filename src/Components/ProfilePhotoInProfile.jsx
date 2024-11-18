import profile from "../Assets/profile.jpg";
import origin_url from "../Services/Origin";
import "./ProfilePhotoInProfile.css"

const ProfilePhotoInProfile = ({profilePicture, username}) => {
    const imageUrl = profilePicture ? `${origin_url}/${profilePicture}` : profile;

    return (
      <div className="profileinprofilePhotoContainer">
        <img className="imgProfileinprofile" src={imageUrl} alt={`${username} avatar`} />
      </div>
    );
}

export default ProfilePhotoInProfile;
