import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import About from "./Components/About/About";
import Register from "./Components/Register/Register";
import Products from "./Components/Products/Products";
import Footer from "./Components/Footer/Footer";
import Categories from "./Components/Categories/Categories";
import Home from "./Components/Home/Home";
import CartPage from "./Components/Cart/CartPage";
import ProductDetail from "./Components/Products/ProductDetail";
import { Auth_Provider } from "./Components/ContextAuth/AuthContext";
import Users from "./Components/Users/Users";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Components/Users/Profile";
import MyOrders from "./Components/Orders/MyOrders";
import OrderEditPage from "./Components/Orders/OrderEditPage";
import Shopping_Provider, { CartProvider } from "./Components/Cart/CartContext";
import UserOrders from "./Components/Cart/UserOrders";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    const updatedCartItems = [...cartItems, product];
    setCartItems(updatedCartItems);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  return (
    <CartProvider>
      <Auth_Provider>
        <Navbar cartItems={cartItems} />
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/product/:productId"
            element={<ProductDetail addToCart={addToCart} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myorders" element={<UserOrders />} />
          <Route path="/login" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/product" element={<Products addToCart={addToCart} />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} />} />
          <Route path="/myOrders" element={<MyOrders />} />
          <Route path="/edit-order/:orderId" element={<OrderEditPage />} />
        </Routes>
        <Footer />
      </Auth_Provider>
      </CartProvider>
  );
}

export default App;
