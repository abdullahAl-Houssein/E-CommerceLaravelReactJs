// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react';
// import { Auth_Context } from '../ContextAuth/AuthContext';

// const UserName = () => {
//   const [username, setUsername] = useState('');
//   const isAuth = useContext(Auth_Context); 
//   const fetchUsername = async () => {
//     console.log(isAuth.auth.authToken);
//     try {
//       const response = await axios.get(
//         "http://127.0.0.1:8000/api/userName",{},
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${isAuth.auth.authToken}`
//           },
//         }
//       );
//       setUsername(response.data.username);
//       console.log("User :" +response.data.username);
//     } catch (error) {
//       console.error('حدث خطأ أثناء جلب اسم المستخدم:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUsername();
//   }, []); // يتم استدعاء الدالة عندما يتم تحميل الصفحة للمرة الأولى

//   return (
//     <div>
//       {username}
//     </div>
//   );
// };

// export default UserName;
