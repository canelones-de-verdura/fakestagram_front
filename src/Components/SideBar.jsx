import React from "react";
import { useNavigate } from "react-router-dom";
import origin_url from "../Services/Origin";
import "./Sidebar.css";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebar__logo">Fakestagram</div>

      <button className="buttonNavv" onClick={() => navigate("/feed")}>
        <span className="material-symbols-outlined">home</span>
        <span>Home</span>
      </button>

      <button className="buttonNavv" onClick={() => navigate("/notifications")}>
        <span className="material-symbols-outlined">notifications</span>
        <span>Notifications</span>
      </button>

      <button className="buttonNavv" onClick={() => navigate("/profile")}>
        <img
          className="imgNav"
          src={`${origin_url}/${user.profilePicture}`}
          alt="Profile"
        />
        <span>Profile</span>
      </button>
    </div>
  );
};

export default Sidebar;
