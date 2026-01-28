import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
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

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (!user) return <p className="checkout-msg">Please login to checkout</p>;
  if (!cart.length) return <p className="checkout-msg">Cart is empty</p>;

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
          <h4>1. Review Your Order ({cart.length} items)</h4>

          {cart.map(item => (
            <div className="review-item" key={item.id}>
              <img
                src={item.thumbnail || item.image}
                alt={item.title}
              />
              <div>
                <p>{item.title}</p>
                <span>Qty: {item.qty}</span>
              </div>
              <strong>${(item.price * item.qty).toFixed(2)}</strong>
            </div>
          ))}

          <div className="review-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </section>

        {/* 2. DELIVERY ADDRESS */}
        <section className="checkout-card">
          <h4>2. Delivery Address</h4>

          <input
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            required
          />

          <div className="row">
            <input
              name="firstName"
              placeholder="First name"
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              placeholder="Last name"
              onChange={handleChange}
              required
            />
          </div>

          <input
            name="phone"
            placeholder="Telephone"
            onChange={handleChange}
            required
          />

          <input
            name="address"
            placeholder="Delivery address"
            onChange={handleChange}
            required
          />

          <div className="row">
            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
              required
            />
            <input
              name="state"
              placeholder="State"
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <input
              name="zip"
              placeholder="ZIP Code"
              onChange={handleChange}
              required
            />
            <select name="country" onChange={handleChange}>
              <option>United States</option>
              <option>India</option>
            </select>
          </div>

          <div className="info-row">
            <span className="check-ui active"></span>
            <span>Billing address is the same as delivery address</span>
          </div>

        </section>

        {/* 3. PAYMENT & SUMMARY */}
        <section className="checkout-card">
          <h4>3. Select Payment Method</h4>

          <div
              className={`payment-option ${form.payment === "card" ? "active" : ""}`}
              onClick={() => setForm({ ...form, payment: "card" })}
            >
              <span className="radio-ui"></span>
              <span className="payment-text">Credit / Debit Card</span>
          </div>

          <div
              className={`payment-option ${form.payment === "paypal" ? "active" : ""}`}
              onClick={() => setForm({ ...form, payment: "paypal" })}
            >
              <span className="radio-ui"></span>
              <span className="payment-text">PayPal</span>
          </div>

          <div className="summary-box">
            <div>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div>
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="total">
              <span>Order Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button className="complete-btn">Complete Order</button>

          <div 
          className="info-row clickable"
          onClick={() => setEmailOffers(prev => !prev)}
          >
            <span className={`check-ui ${emailOffers ? "active" : ""}`}></span>
            <span>Email me about offers</span>
          </div>
        </section>
      </form>
    </div>
  );
};

export default CheckoutPage;
