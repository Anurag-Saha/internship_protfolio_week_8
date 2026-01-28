import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

const addToCart = (product) => {
  setCart(prev => {
    const existing = prev.find(item => item.id === product.id);

    if (existing) {
      return prev.map(item =>
        item.id === product.id
          ? { ...item, qty: item.qty + 1 }
          : item
      );
    }

    return [
      ...prev,
      {
        ...product,
        thumbnail: product.thumbnail || product.image,
        qty: 1
      }
    ];
  });
};

const increaseQty = (id) => {
  setCart(cart.map(item =>
    item.id === id ? { ...item, qty: item.qty + 1 } : item
  ));
};

const decreaseQty = (id) => {
  setCart(cart
    .map(item =>
      item.id === id ? { ...item, qty: item.qty - 1 } : item
    )
    .filter(item => item.qty > 0)
  );
};

  const removeFromCart = (id) =>
    setCart(cart.filter(item => item.id !== id));

  return (
    <CartContext.Provider value={{
  cart,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty
}}>

      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
