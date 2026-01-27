import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "../services/api";
import { useCart } from "../contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams();           // 1️⃣ get product id
  const { addToCart } = useCart();      // 2️⃣ cart function

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 3️⃣ fetch single product
  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProduct(id);
      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p style={{ padding: 20 }}>Loading product...</p>;
  }

  return (
    <div className="container">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          background: "white",
          padding: "30px",
          borderRadius: "16px"
        }}
      >
        {/* IMAGE */}
        <div style={{ textAlign: "center" }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ height: "300px", objectFit: "contain" }}
          />
        </div>

        {/* DETAILS */}
        <div>
          <h2 style={{ marginBottom: "12px" }}>{product.title}</h2>

          <h3 style={{ color: "#2563eb", marginBottom: "12px" }}>
            ${product.price}
          </h3>

          <p style={{ marginBottom: "20px", lineHeight: 1.6 }}>
            {product.description}
          </p>

          <button
            onClick={() => addToCart(product)}
            style={{
              padding: "12px 20px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px"
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;