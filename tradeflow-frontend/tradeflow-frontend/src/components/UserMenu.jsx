import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./UserMenu.css";

export default function UserMenu() {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  if (!isAuthenticated) return null;

  const initial = user?.email?.charAt(0).toUpperCase() || "U";

  /* =========================
     CLOSE LOGIC (ROBUST)
  ========================= */
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    const handleScroll = () => {
      setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [open]);

  /* =========================
     CLOSE ON ROUTE CHANGE
  ========================= */
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="user-menu" ref={menuRef}>
      <div
        className="user-avatar"
        onClick={() => setOpen((prev) => !prev)}
        title={user.email}
      >
        {initial}
      </div>

      {open && (
        <div className="user-dropdown">
          <p className="user-email">{user.email}</p>

          {isAdmin && (
            <>
              <Link to="/give-auth" className="user-link">
                Give Auth
              </Link>

              <Link to="/mechanics" className="user-link">
                Add Mechanic
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
