import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "./CartPage.css";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty 🛒</h2>
        <Link to="/shop" className="btn-primary">
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h2 className="cart-title">Your Cart</h2>

      <div className="cart-layout">
        {/* LEFT: CART ITEMS */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={item.thumbnail || item.image}
                alt={item.title}
                className="cart-img"
              />

              <div className="cart-info">
                <h4>{item.title}</h4>
                <p className="price">${item.price.toFixed(2)}</p>

                <div className="qty-control">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-actions">
                <p className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          <Link to="/checkout" className="btn-primary">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
