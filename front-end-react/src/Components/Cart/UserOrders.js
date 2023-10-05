import React, { useContext, useEffect, useState } from 'react';
import { Auth_Context } from '../ContextAuth/AuthContext';
import './UserOrders.css'
function UserOrders() {
  const [orders, setOrders] = useState([]);
  const isAuth = useContext(Auth_Context);
  const userId = isAuth.auth.userId;
  console.log(userId);
  useEffect(() => {
    // قم بإجراء طلب للحصول على طلبات المستخدم باستخدام userId
    fetch(`http://127.0.0.1:8000/api/user_orders/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // تأكد من أن البيانات تحتوي على مصفوفة الطلبات
        if (Array.isArray(data.orders)) {
          // قم بتعيين مصفوفة الطلبات التي تم الحصول عليها في حال نجاح الاستجابة
          setOrders(data.orders);
        } else {
          console.error('لم يتم العثور على مصفوفة الطلبات في الاستجابة.');
        }
      })
      .catch((error) => {
        console.error('حدث خطأ أثناء جلب طلبات المستخدم: ', error);
      });
  }, [userId]);

  
  return (
    <div className="user-orders-container">
      <h2 className="user-orders-header"> My Orders</h2>
      <ul className="user-orders-list">
        {orders.map((order) => (
          <li className="user-order-item" key={order.id}>
            {/* عرض معلومات الطلب هنا */}
            <p> Number Order : {order.id}</p>
            <p>Title: {order.title}</p>
            <p>Price total : {order.total_price}</p>
            {/* يمكنك عرض المزيد من المعلومات حسب الحاجة */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserOrders;
