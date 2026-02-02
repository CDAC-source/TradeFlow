import { useEffect, useState } from "react";
import { notificationStore } from "../../context/NotificationStore";
import "./Notifications.css";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    return notificationStore.subscribe(setNotifications);
  }, []);

  return (
    <div className="page-container">
      <h2>Notifications</h2>

      {notifications.length === 0 && (
        <p className="text-muted">No notifications</p>
      )}

      {notifications.map(n => (
        <div key={n.id} className={`notif-item ${n.type}`}>
          <div>
            <strong>{n.message}</strong>
            <div className="notif-time">{n.time}</div>
          </div>

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => notificationStore.remove(n.id)}
          >
            Clear
          </button>
        </div>
      ))}

      {notifications.length > 0 && (
        <button
          className="btn btn-danger mt-3"
          onClick={() => notificationStore.clear()}
        >
          Clear All
        </button>
      )}
    </div>
  );
}
