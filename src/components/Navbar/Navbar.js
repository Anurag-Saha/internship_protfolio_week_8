import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { cart } = useCart();
  const { user, login, logout } = useAuth();

  return (
    <nav className="nav">
      <Link to="/" className="logo">Trendsy</Link>

      <div>
        <Link to="/cart">Cart ({cart.length})</Link>

        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={login}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
