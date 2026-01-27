import { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductList from "../components/ProductList/ProductList";
import "./Shop.css";

const Shop = () => {
  const { products, loading } = useProducts();

  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  const filtered =
    category === "all"
      ? products
      : products.filter(p => p.category === category);

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "name-asc") return a.title.localeCompare(b.title);
    return 0;
  });

  if (loading) return <p className="loading">Loading products...</p>;

  return (
    <div className="shop-page container">
      {/* SIDEBAR */}
      <aside className="shop-filters">
        <h3>Filters</h3>

        <div className="filter-group">
          <label>Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="men's clothing">Fashion</option>
            <option value="jewelery">Jewellery</option>
          </select>
        </div>

        <button
          className="clear-btn"
          onClick={() => {
            setCategory("all");
            setSort("default");
          }}
        >
          Clear Filters
        </button>
      </aside>

      {/* MAIN */}
      <section className="shop-content">
        <div className="shop-topbar">
          <p>
            Showing <strong>{sorted.length}</strong> products
          </p>

          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="default">Sort by</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name-asc">Name: A–Z</option>
          </select>
        </div>

        <ProductList products={sorted} />
      </section>
    </div>
  );
};

export default Shop;
