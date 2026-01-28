import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cart.length === 0) {
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
        {/* LEFT: ITEMS */}
        <div className="cart-items">
          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <img
                src={item.thumbnail || item.imagewhe}
                alt={item.title}
                className="cart-img"
              />

              <div className="cart-info">
                <h4>{item.title}</h4>
                <p className="price">${item.price.toFixed(2)}</p>

                <div className="qty-control">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>

              <div className="cart-actions">
                <p className="item-total">
                  ${(item.price * item.qty).toFixed(2)}
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
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
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
