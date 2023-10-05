import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Auth_Context } from "../ContextAuth/AuthContext";
import "./MyOrders.css";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAuth = useContext(Auth_Context);
 
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const userId = isAuth.auth.userId;
    console.log(userId);
    try {
      // get user order
      const response = await axios.get(
        `http://127.0.0.1:8000/api/user_orders/${userId}`
      );
      setOrders(response.data.orders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="my-orders-container">
      <h1 className="my-orders-title">My Orders</h1>
      {orders.length === 0 ? (
        <p className="no-orders-message">No orders found</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <div className="order-details">
                <strong className="order-info">Title:</strong> {order.title}
              </div>
              <div className="order-details">
                <strong className="order-info">Total Price:</strong> $
                {order.total_price}
              </div>
              <div className="order-details">
                <strong className="order-info">User Name:</strong>{" "}
                {isAuth.auth.userName}
              </div>
              <div className="order-details">
                <strong className="order-info">Order Date:</strong>{" "}
                {order.created_at}
              </div>
              <Link to={`/edit-order/${order.id}`}>
                <button>Edit Order</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
