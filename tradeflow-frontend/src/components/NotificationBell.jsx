import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notificationStore } from "../context/NotificationStore";
import "./NotificationBell.css";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    return notificationStore.subscribe(setNotifications);
  }, []);

  return (
    <div
      className="notif-wrapper"
      onClick={() => navigate("/notifications")}
      title="Notifications"
    >
      🔔
      {notifications.length > 0 && (
        <span className="notif-badge">{notifications.length}</span>
      )}
    </div>
  );
}
