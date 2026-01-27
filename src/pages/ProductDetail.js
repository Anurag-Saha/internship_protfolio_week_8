import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../services/api";
import { useCart } from "../contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div className="container">
      <div className="product-detail-card">
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{ height: 300, objectFit: "contain" }}
        />

        <h2>{product.title}</h2>
        <h3>${product.price}</h3>
        <p>{product.description}</p>

        <button onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
