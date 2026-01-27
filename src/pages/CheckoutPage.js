import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
  });
  const { user } = useAuth();

    if (!user) {
        return <h2 style={{ padding: 20 }}>Please login to checkout</h2>;
    }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.address) {
      alert("Please fill all fields");
      return;
    }

    clearCart();
    alert("Order placed successfully!");
    navigate("/");
  };

  if (cart.length === 0) {
    return <h2 style={{ padding: 20 }}>No items to checkout</h2>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h2>Checkout</h2>

      <input
        placeholder="Full Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <br /><br />

      <input
        placeholder="Shipping Address"
        value={form.address}
        onChange={(e) =>
          setForm({ ...form, address: e.target.value })
        }
      />

      <br /><br />

      <button type="submit">Place Order</button>
    </form>
  );
};

export default CheckoutPage;
