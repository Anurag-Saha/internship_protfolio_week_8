import { motion } from "framer-motion";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

const ProductList = ({ category, limit }) => {
  const { products, loading } = useProducts(category);
  const filteredProducts =
  category === "all"
    ? products
    : products.filter(p => p.category === category);

    const displayedProducts = limit
        ? filteredProducts.slice(0, limit)
        : filteredProducts;


  if (loading) return <p className="loading">Loading...</p>;

  // ProductList.js
return (
  <motion.div
    className="grid product-grid"
    initial="hidden"
    animate="show"
    variants={{
      show: { transition: { staggerChildren: 0.08 } }
    }}
  >
    {displayedProducts.map(p => (
      <motion.div
        key={p.id}
        variants={{
          hidden: { opacity: 0, y: 40 },
          show: { opacity: 1, y: 0 }
        }}
      >
        <ProductCard product={p} />
      </motion.div>
    ))}
  </motion.div>
);

};

export default ProductList;
