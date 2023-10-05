// CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      // If the product already exists, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // If the product doesn't exist, add it to the cart
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };
  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
  };
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        calculateTotalPrice,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
