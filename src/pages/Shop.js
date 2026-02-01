import { useState, useEffect } from "react";
import useProducts from "../hooks/useProducts";
import ProductList from "../components/ProductList/ProductList";
import "./Shop.css";

const ITEMS_PER_PAGE = 15;

const Shop = () => {
  const { products, loading, error } = useProducts();


const [category, setCategory] = useState("all");
const [sort, setSort] = useState("default");
const [currentPage, setCurrentPage] = useState(1);

// price range
const MIN_PRICE = 15;
const MAX_PRICE = 100;

const [priceRange, setPriceRange] = useState(MAX_PRICE);


  // 🔹 Dynamic categories
  const categories = [...new Set(products.map(p => p.category))];

  // 🔹 FILTER
const filtered = products.filter(p => {
  const matchCategory =
    category === "all" || p.category === category;

  const matchPrice = p.price <= priceRange;

  return matchCategory && matchPrice;
});


  // 🔹 SORT
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "name-asc") return a.title.localeCompare(b.title);
    return 0;
  });

  // 🔹 PAGINATION LOGIC
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = sorted.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // 🔹 Reset page when filter/sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category, sort]);

  if (loading) {
  return <p className="loading">Loading products...</p>;
}

if (error) {
  return <p style={{ color: "red" }}>{error}</p>;
}

  return (
    <div className="shop-page container">
      {/* SIDEBAR */}
      <aside className="shop-filters">
  <div className="filters-header">
    <h3>Filters</h3>
    <button
      className="clear-link"
      onClick={() => {
  setCategory("all");
  setSort("default");
  setPriceRange(MAX_PRICE);
}}

    >
      Clear All
    </button>
  </div>

  {/* PRICE RANGE */}
  <div className="filter-section">
    <h4>Price Range</h4>

    <input
  type="range"
  min={MIN_PRICE}
  max={MAX_PRICE}
  value={priceRange}
  onChange={(e) => setPriceRange(Number(e.target.value))}
/>

    <div className="price-values">
  <span>${MIN_PRICE}</span>
  <span>${priceRange}</span>
</div>

  </div>

  {/* CATEGORY */}
  <div className="filter-section">
    <h4>Category</h4>

    <div className="chip-group">
      <button
        className={`chip ${category === "all" ? "active" : ""}`}
        onClick={() => setCategory("all")}
      >
        All
      </button>

      {categories.map(cat => (
        <button
          key={cat}
          className={`chip ${category === cat ? "active" : ""}`}
          onClick={() => setCategory(cat)}
        >
          {cat.replace("-", " ")}
        </button>
      ))}
    </div>
  </div>
</aside>


      {/* MAIN */}
      <section className="shop-content">
        <div className="shop-topbar">
          <p>
            Showing{" "}
            <strong>
              {startIndex + 1}–
              {Math.min(startIndex + ITEMS_PER_PAGE, sorted.length)}
            </strong>{" "}
            of <strong>{sorted.length}</strong> products
          </p>

          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="default">Sort by</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name-asc">Name: A–Z</option>
          </select>
        </div>

        <ProductList products={paginatedProducts} />

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              ‹ Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(0, 5)
              .map(page => (
                <button
                  key={page}
                  className={page === currentPage ? "active" : ""}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

            <span className="dots">…</span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Next ›
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Shop;
