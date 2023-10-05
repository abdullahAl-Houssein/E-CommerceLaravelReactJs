import React, { useContext, useEffect } from 'react';
import { useCart } from './CartContext';
import { Auth_Context } from '../ContextAuth/AuthContext';
import './CartPage.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // استيراد المكتبة

import 'react-toastify/dist/ReactToastify.css'; // استيراد ستايلات المكتبة

function CartPage() {
  const {
    cart,
    removeFromCart,
    calculateTotalPrice,
    increaseQuantity,
    decreaseQuantity,
    clearCart
  } = useCart();
  const isAuth = useContext(Auth_Context);
  const userId = isAuth.auth.userId;
  const userName = isAuth.auth.userName;
console.log(userId);
  const handleIncreaseQuantity = (productId) => {
    increaseQuantity(productId);
  };

  const handleDecreaseQuantity = (productId) => {
    decreaseQuantity(productId);
  };

  const handleSubmitOrder = () => {
    // إعداد البيانات اللازمة لإرسال الطلب
    const orderData = {
      title: `${userName}'s Orders`,
      user_id: userId,
      products: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };
    console.log(orderData);

    // أرسل الطلب إلى الخادم
    fetch('http://127.0.0.1:8000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error('حدث خطأ أثناء إرسال الطلب');
        }
        clearCart();
        localStorage.setItem('orders', JSON.stringify(cart));
        toast.success('Send Order Successfully'); // عرض رسالة النجاح باستخدام react-toastify
        return response.json();
      })
      .then((data) => {
        console.log('تم إرسال الطلب بنجاح:', data);
      })
      .catch((error) => {
        console.error('خطأ:', error.message);
        toast.error('حدث خطأ أثناء إرسال الطلب'); // عرض رسالة الخطأ باستخدام react-toastify
      });
  };

  return (
    <div className="cart-container-cart">
      <h2 className="cart-header">Shopping Cart</h2>
      <ul className="cart-item-list">
        {cart.map((item) => (
          <li className="cart-item" key={item.id}>
            <img className="cart-item-image" src={item.img_url} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.description.slice(0, 25)}</p>
            <p><span>Quantity</span> {item.quantity}</p>
            <p><span>Price</span> {item.price}</p>
            <p>
              Totlal Price  = ${item.quantity * item.price}
            </p>
            <button className="cart-button" onClick={() => handleIncreaseQuantity(item.id)}>
              Increase
            </button>
            <button className="cart-button" onClick={() => handleDecreaseQuantity(item.id)}>
              Decrease
            </button>
            <button className="cart-button" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="cart-total-price">Total Price: ${calculateTotalPrice()}</p>
      <button className="cart-submit-button" onClick={handleSubmitOrder}>
        Submit Order
      </button>
      <Link to="/myorders">
        <button className="cart-submit-button-2">My Orders</button>
      </Link>
      
      {/* مكون react-toastify لعرض الرسائل */}
      <ToastContainer />
    </div>
  );
}

export default CartPage;
