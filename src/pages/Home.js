import { motion } from "framer-motion";
import ProductList from "../components/ProductList/ProductList";
import "./Home.css";
import { useState } from "react";
import { Link } from "react-router-dom";



const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>
            Elevate Your <span>Shopping</span> Experience
          </h1>
          <p>
            Premium products. Modern design. Seamless checkout.
          </p>

          <motion.div whileHover={{ scale: 1.08 }}>
  <Link to="/shop" className="hero-btn">
    Shop Now
  </Link>
</motion.div>

        </motion.div>
      </section>

      {/* STATS */}
      <section className="stats">
        {[
          ["10K+", "Happy Customers"],
          ["1K+", "Products"],
          ["4.9★", "Average Rating"]
        ].map(([value, label], i) => (
          <motion.div
            key={i}
            className="stat-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <h2>{value}</h2>
            <p>{label}</p>
          </motion.div>
        ))}
      </section>

      {/* CATEGORIES */}
      <section className="categories">
  <h2>Shop by Category</h2>

  <div className="category-grid">
    {[
      { label: "All", value: "all" },
      { label: "Electronics", value: "electronics" },
      { label: "Fashion", value: "men's clothing" },
      { label: "Jewellery", value: "jewelery" }
    ].map((cat, i) => (
      <motion.div
        key={cat.value}
        className={`category-card ${
          selectedCategory === cat.value ? "active" : ""
        }`}
        whileHover={{ y: -10, scale: 1.05 }}
        onClick={() => setSelectedCategory(cat.value)}
      >
        {cat.label}
      </motion.div>
    ))}
  </div>
</section>


      {/* PRODUCTS */}
      <section id="products" className="products">
        <h2>Featured Products</h2>
        <ProductList category={selectedCategory} limit={7} />
      </section>
    </div>
  );
};

export default Home;
