import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../src/pages/AuthContext";  // Fixed path (removed /src)
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { auth } from "../src/firebaseConfig";        // Fixed path (removed /src)
import "../src/pages/Navbar.css";                          // Fixed path (CSS should be in same directory)

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      if (logout) await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isAdmin = user?.email === "thxnujay@gmail.com";

  // Return null if not admin (hides navbar completely)
  if (!isAdmin) return null;

  return (
    <header className="bus-header">
      <div className="navbar-container">
        <div className="logo">SLIIT Transport</div>
        
        <button className="hamburger" onClick={toggleMenu}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-link">
            Public View
          </Link>
          <Link
            to="/admin/dashboard"
            className={`nav-link ${
              location.pathname.includes("dashboard") ? "active" : ""
            }`}
          >
            Dashboard
          </Link>
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={16} /> Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;