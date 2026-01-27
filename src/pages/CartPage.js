import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  const total = cart.reduce(
  (sum, item) => sum + item.price * item.qty,
  0
);

  

  if (cart.length === 0) {
    return <h2 style={{ padding: 20 }}>Your cart is empty</h2>;
  }

  return (
    <div className="container">
      <h2>Your Cart</h2>

      {cart.map(item => (
    <div
      key={item.id}
      style={{
        background: "white",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <div>
        <h4>{item.title}</h4>
        <p>${item.price.toFixed(2)}</p>
        <div>
            <button onClick={() => decreaseQty(item.id)}>-</button>
            <span style={{ margin: "0 8px" }}>{item.qty}</span>
            <button onClick={() => increaseQty(item.id)}>+</button>
        </div>

      </div>

      <button onClick={() => removeFromCart(item.id)}>
        Remove
      </button>
    </div>
  ))}

      <hr style={{ margin: "20px 0" }} />

      <h3>Total: ${total.toFixed(2)}</h3>

      <Link to="/checkout">
        <button style={{ marginTop: 12 }}>
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
};

export default CartPage;
