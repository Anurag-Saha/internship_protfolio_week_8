import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar/Navbar";

const Home = lazy(() => import("./pages/Home"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const Shop = lazy(() => import("./pages/Shop"));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<p style={{ padding: 20 }}>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
