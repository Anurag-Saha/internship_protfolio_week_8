const BASE_URL = "https://dummyjson.com";

export const fetchProducts = async () => {
  const res = await fetch(`${BASE_URL}/products?limit=60`);
  const data = await res.json();
  return data.products;
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
};