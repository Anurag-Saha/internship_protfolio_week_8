import ProductList from "../components/ProductList/ProductList";

const Shop = () => {
  return (
    <div className="container" style={{ paddingTop: "40px" }}>
      <h1 style={{ marginBottom: "30px" }}>Shop All Products</h1>
      <ProductList category="all" />
    </div>
  );
};

export default Shop;
