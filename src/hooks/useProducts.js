import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return { products, loading };
};

export default useProducts;
