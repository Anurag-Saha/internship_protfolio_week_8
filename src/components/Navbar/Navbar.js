import { NavLink } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, login, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-inner">
        {/* LOGO */}
        <NavLink to="/" className="logo">
          Trendsy
        </NavLink>

        {/* LINKS */}
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
            <button className="nav-btn" onClick={login}>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
