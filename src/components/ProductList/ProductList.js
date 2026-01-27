import { motion } from "framer-motion";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

const ProductList = ({ products, limit }) => {
  const displayedProducts = limit
    ? products.slice(0, limit)
    : products;

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
