import { NavLink } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { cart } = useCart();
  const { user, login, logout } = useAuth();

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

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
            {totalQty > 0 && (
              <span className="cart-badge">{totalQty}</span>
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
