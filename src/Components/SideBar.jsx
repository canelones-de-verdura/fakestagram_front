// Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import origin_url from "../Services/Origin";
import "./Sidebar.css";

const Sidebar = () => {
  
  const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

  const handleHome = () => navigate("/feed");
  const handleNotifications = () => navigate("/notifications");
  const handleProfile = () => navigate("/profile");

  return (
    <div className="sidebar">
      <div className="sidebar__logo">Fakestagram</div>
      <ul className="sidebar__menu">
        <li className="sidebar__item">
          <button className="buttonNav" onClick={handleHome}>
            <span className="material-symbols-outlined">home</span>
            <span>Home</span>
          </button>
        </li>
        <li className="sidebar__item">
          <button className="buttonNav" onClick={handleNotifications}>
            <span className="material-symbols-outlined">notifications</span>
            <span>Notifications</span>
          </button>
        </li>
        <li className="sidebar__item">
          <button className="buttonNav" onClick={handleProfile}>
            <img
              className="imgNav"
              src={`${origin_url}/${user.profilePicture}`}
            />
            <span>Profile</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
