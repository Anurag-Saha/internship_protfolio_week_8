import { useState, useEffect } from "react";
import useProducts from "../hooks/useProducts";
import ProductList from "../components/ProductList/ProductList";
import "./Shop.css";

const ITEMS_PER_PAGE = 15;

const Shop = () => {
  const { products, loading } = useProducts();

  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Dynamic categories
  const categories = ["all", ...new Set(products.map(p => p.category))];

  // 🔹 FILTER
  const filtered =
    category === "all"
      ? products
      : products.filter(p => p.category === category);

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

  if (loading) return <p className="loading">Loading products...</p>;

  return (
    <div className="shop-page container">
      {/* SIDEBAR */}
      <aside className="shop-filters">
        <h3>Filters</h3>

        <div className="filter-group">
          <label>Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.replace("-", " ").toUpperCase()}
              </option>
            ))}
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
