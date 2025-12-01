// src/context/AuthCartContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthCartContext = createContext();

export const AuthCartProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  // Đồng bộ cartCount từ localStorage: chỉ tính số lượng mặt hàng khác nhau
  const updateCartCountFromLocalStorage = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.length; // Đếm số item, không tính tổng qty
    setCartCount(count);
  };

  const addToCart = (id, quantity = 1) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.qty += quantity;
    } else {
      cart.push({ id, qty: quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCountFromLocalStorage();
  };

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("linkedId", userData.linkedId);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("role", userData.role);
    updateCartCountFromLocalStorage();
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setCartCount(0);
    localStorage.removeItem("cart");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("linkedId");
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartCount(0);
  };

  useEffect(() => {
    updateCartCountFromLocalStorage();

    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthCartContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        cartCount,
        setCartCount,
        updateCartCountFromLocalStorage,
        user,
        setUser,
        login,
        logout,
        clearCart,
        addToCart,
      }}
    >
      {children}
    </AuthCartContext.Provider>
  );
};

export const useAuthCart = () => useContext(AuthCartContext);