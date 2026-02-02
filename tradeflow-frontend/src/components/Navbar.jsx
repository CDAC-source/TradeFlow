import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";
import UserMenu from "./UserMenu";
import "./Navbar.css";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate(isAuthenticated ? "/dashboard" : "/login");
  };

  return (
    <nav className="tf-navbar">
      {/* LEFT */}
      <div
        className="tf-logo"
        onClick={handleLogoClick}
        title="Go to Dashboard"
      >
        TradeFlow
      </div>

      {/* RIGHT */}
      <div className="tf-nav-actions">
        {isAuthenticated ? (
          <>
            <div className="tf-user-actions">

              {/* HELP */}
              <div
                className="tf-nav-link"
                onClick={() => navigate("/help")}
                title="Help & Support"
              >
                <span className="tf-nav-icon">?</span>
                <span>Help</span>
              </div>

              {/* ABOUT */}
              <div
                className="tf-nav-link subtle"
                onClick={() => navigate("/about")}
                title="About TradeFlow"
              >
                <span className="tf-nav-icon">i</span>
                <span>About</span>
              </div>

              {/* NOTIFICATION */}
              <div className="tf-bell-wrapper">
                <NotificationBell />
              </div>

              {/* USER */}
              <UserMenu />
            </div>

            <button className="tf-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="tf-link">
              Register
            </Link>
            <Link to="/login" className="tf-login-btn">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
