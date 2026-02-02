import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, updateUserRole } from "../../services/adminService";
import { useAuth } from "../../context/AuthContext";
import "./GiveAuth.css";

export default function GiveAuth() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const changeRole = async (id, newRole) => {
    if (!window.confirm(`Change role to ${newRole}?`)) return;

    try {
      await updateUserRole(id, newRole);

      // 🔐 If admin changes their own role → force logout
      if (id === user.id && newRole === "USER") {
        alert("Your role has changed. Please login again.");
        logout();
        navigate("/login");
        return;
      }

      loadUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to update role");
    }
  };

  // 🚫 HARD FRONTEND GUARD
  if (user?.role !== "ADMIN") {
    return (
      <div className="ga-container">
        <div className="ga-card">
          <h3>Access Denied</h3>
          <p>Admin access only.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ga-container">
      <div className="ga-card">
        <h2 className="ga-title">Give Authorization</h2>

        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table className="ga-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    {u.role === "USER" ? (
                      <button
                        className="btn-admin"
                        onClick={() => changeRole(u.id, "ADMIN")}
                      >
                        Make Admin
                      </button>
                    ) : (
                      <button
                        className="btn-user"
                        onClick={() => changeRole(u.id, "USER")}
                        disabled={u.id === user.id} // optional safety
                      >
                        Make User
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
