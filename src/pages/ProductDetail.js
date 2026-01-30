import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchProductById } from "../services/api";
import { useCart } from "../contexts/CartContext";
import "./ProductDetail.css";
import { useNavigate } from "react-router-dom";
 
const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleBuyNow = () => {
  addToCart(product);
  navigate("/checkout");
};

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) return <p className="pd-loading">Loading product…</p>;

  return (
    <motion.div
      className="product-detail container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* TOP SECTION */}
      <div className="pd-top">
        {/* IMAGE */}
        <motion.div
          className="pd-image"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
          />
        </motion.div>

        {/* INFO */}
        <div className="pd-info">
          <h1>{product.title}</h1>

          <div className="pd-meta">
            <span className="price">${product.price}</span>
            <span className="rating">⭐ {product.rating}</span>
            <span className="stock">
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <p className="description">{product.description}</p>

          <div className="pd-actions">
            <button
              className="add-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

            <button className="buy-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>

          <div className="pd-tags">
            <span>Category: {product.category}</span>
            <span>Brand: {product.brand}</span>
          </div>
        </div>
      </div>

      {/* EXTRA CONTENT */}
      <div className="pd-extra">
        <div className="pd-card">
          <h3>Why you’ll love it</h3>
          <ul>
            <li>Premium build quality</li>
            <li>High customer satisfaction</li>
            <li>Modern design & durability</li>
            <li>Trusted brand assurance</li>
          </ul>
        </div>

        <div className="pd-card">
          <h3>Delivery & Returns</h3>
          <p>🚚 Free delivery within 3–5 business days.</p>
          <p>↩️ Easy 7-day return policy.</p>
          <p>🔒 Secure & safe checkout.</p>
        </div>

        <div className="pd-card">
          <h3>Secure Shopping</h3>
          <p>✔ 100% genuine products</p>
          <p>✔ Encrypted transactions</p>
          <p>✔ Trusted sellers</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
