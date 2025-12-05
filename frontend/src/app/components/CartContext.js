"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext); // ✅ hook

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  // const fetchCart = async () => {
  //   const res = await fetch("http://localhost:8080/api/cart", { credentials: "include" });
  //   const data = await res.json();
  //   setCart(data);
  // };

  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/cart", { credentials: "include" });
      if (!res.ok) return { items: [] };
      const data = await res.json();
      setCart(data);
      return data; // ✅ return cart for callers
    } catch {
      const fallback = { items: [] };
      setCart(fallback);
      return fallback;
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
