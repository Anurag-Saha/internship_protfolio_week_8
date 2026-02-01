import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <NavLink to="/" className="logo">
          Trendsy
        </NavLink>

        <div className="nav-links">
          <NavLink to="/shop" className="nav-link">
            Shop
          </NavLink>

          <NavLink to="/cart" className="nav-link cart-link">
            Cart
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </NavLink>

          {user ? (
            <button className="nav-btn" onClick={logout}>
              Logout
            </button>
          ) : (
            <button
              className="nav-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
