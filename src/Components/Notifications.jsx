import React, { useEffect, useState } from "react";
import NotificationService from "../Services/NotificationService";
import "./Notifications.css";

const Notifications = ({ modalOpen, toggleModal }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user")); // Asegúrate de guardar el token y _id
        const data = await NotificationService.getUserNotifications(user.token);
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <p>Loading notifications...</p>;

  return (
    <>
      {modalOpen && (
        <div className="notification-modal-overlay">
          <div className="notification-modal-content">
            <button onClick={toggleModal} className="close-modal">
              Close
            </button>
            <h2>Notifications</h2>
            {notifications.length === 0 ? (
              <p>No notifications available.</p>
            ) : (
              <ul>
                {notifications.map((notif) => (
                  <li key={notif._id}>
                    <div className="notification-item">
                      <div>
                        <p>
                          <strong>
                            {notif.fromUserId?.username || "Unknown User"}
                          </strong>{" "}
                          {notif.type === "like"
                            ? "liked your post"
                            : "commented on your post"}
                        </p>
                        
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Notifications;
