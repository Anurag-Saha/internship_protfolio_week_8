import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [emailOffers, setEmailOffers] = useState(false);

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    payment: "card",
  });

  if (!user) {
    return <p className="checkout-msg">Please login to checkout</p>;
  }

  if (cartItems.length === 0) {
    return <p className="checkout-msg">Cart is empty</p>;
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    alert("Order placed successfully!");
    navigate("/");
  };

  return (
    <div className="checkout-page container">
      <form className="checkout-grid" onSubmit={handleSubmit}>
        {/* 1. REVIEW ORDER */}
        <section className="checkout-card">
          <h4>1. Review Your Order ({cartItems.length} items)</h4>

          {cartItems.map((item) => (
            <div className="review-item" key={item.id}>
              <img
                src={item.thumbnail || item.image}
                alt={item.title}
              />
              <div>
                <p>{item.title}</p>
                <span>Qty: {item.quantity}</span>
              </div>
              <strong>
                ${(item.price * item.quantity).toFixed(2)}
              </strong>
            </div>
          ))}

          <div className="review-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </section>

        {/* 2. DELIVERY ADDRESS */}
        <section className="checkout-card">
          <h4>2. Delivery Address</h4>

          <input name="email" placeholder="Email" onChange={handleChange} required />

          <div className="row">
            <input name="firstName" placeholder="First name" onChange={handleChange} required />
            <input name="lastName" placeholder="Last name" onChange={handleChange} required />
          </div>

          <input name="phone" placeholder="Phone" onChange={handleChange} required />
          <input name="address" placeholder="Address" onChange={handleChange} required />

          <div className="row">
            <input name="city" placeholder="City" onChange={handleChange} required />
            <input name="state" placeholder="State" onChange={handleChange} required />
          </div>

          <div className="row">
            <input name="zip" placeholder="ZIP" onChange={handleChange} required />
            <select name="country" onChange={handleChange}>
              <option>United States</option>
              <option>India</option>
            </select>
          </div>
        </section>

        {/* 3. PAYMENT */}
        <section className="checkout-card">
          <h4>3. Payment & Summary</h4>

          <div className="summary-box">
            <div>
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div className="total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <button className="complete-btn">Complete Order</button>

          <div
            className="info-row clickable"
            onClick={() => setEmailOffers((p) => !p)}
          >
            <span className={`check-ui ${emailOffers ? "active" : ""}`} />
            <span>Email me about offers</span>
          </div>
        </section>
      </form>
    </div>
  );
};

export default CheckoutPage;
