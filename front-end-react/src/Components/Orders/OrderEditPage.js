import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./OrderEditPage.css";

const OrderEditPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    total_price: 0,
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/orders/${orderId}`
        );
        const orderData = response.data.order;
        setFormData({
          title: orderData.title,
          total_price: orderData.total_price,
        });
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateOrder = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/orders/${orderId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      navigate("/myOrders");
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div>
      <h1>Edit Order</h1>
      <form>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Total Price:</label>
          <input
            type="number"
            name="total_price"
            value={formData.total_price}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={updateOrder}>
          Update Order
        </button>
      </form>
    </div>
  );
};

export default OrderEditPage;
