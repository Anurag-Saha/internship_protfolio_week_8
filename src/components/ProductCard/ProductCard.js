import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h4>{product.title}</h4>
      <p>${product.price}</p>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>

      <Link to={`/product/${product.id}`}>View</Link>
    </div>
  );
};

export default ProductCard;
