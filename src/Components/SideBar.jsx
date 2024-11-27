import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePhoto from "./ProfilePhoto";
import Notifications from "./Notifications";
import "./Sidebar.css";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false); // Estado centralizado para el modal

    const handleLogout = () => {
        localStorage.removeItem("user"); // Eliminar el usuario del localStorage
        navigate("/login"); // Redirigir al login
    };

  const toggleModal = () => {
    setModalOpen(!modalOpen); // Cambiar el estado del modal
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logo">Fakestagram</div>
      <button className="buttonNavv" onClick={() => navigate("/feed")}>
        <span className="material-symbols-outlined">home</span>
        <span>Home</span>
      </button>
      <button className="buttonNavv" onClick={toggleModal}>
        <span className="material-symbols-outlined">notifications</span>
        <span>Notifications</span>
      </button>
      <button className="buttonNavv" onClick={
        () => navigate("/profile", { state: { user_id: user._id } })
      }>
        <ProfilePhoto
          profilePicture={user.profilePicture}
          username={user.username}
        />
        <span>Profile</span>
      </button>
      <button className="buttonNavv logoutButton" onClick={handleLogout}>
        <span className="material-symbols-outlined">logout</span>
        <span>Logout</span>
      </button>

      {/* Pasar el estado del modal a Notifications */}
      <Notifications modalOpen={modalOpen} toggleModal={toggleModal} />
    </div>
  );
};

export default Sidebar;
