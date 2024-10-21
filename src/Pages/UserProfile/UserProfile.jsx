import React from 'react';
import './UserProfile.css';

const UserProfile = ({ user }) => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        {/*Esta imagen dependiendo el tipo de imagen que se le pase se bugea*/}
        <img className="profile-pic" src={user.profilePicture} alt={`${user.username}'s profile`} />
        <div className="profile-info">
          <div className="profile-username">
            <h2>{user.username}</h2>
            <button className="edit-profile-btn">Edit Profile</button>
          </div>
          <div className="profile-stats">
            <p><strong>{user.posts.length}</strong> posts</p>
            <p><strong>{user.followers}</strong> followers</p>
            <p><strong>{user.following}</strong> following</p>
          </div>
          <div className="profile-bio">
            <p className='namee'>{user.name}</p>
            <p>{user.bio}</p>
          </div>
        </div>
      </div>
      <div className="profile-gallery">
        {user.posts.map((post, index) => (
          <img key={index} className="gallery-item" src={post.imageUrl} alt={`Post ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
