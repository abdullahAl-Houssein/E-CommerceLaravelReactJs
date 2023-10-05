import { createContext, useEffect, useState } from "react";

export const Auth_Context = createContext({});

export function Auth_Provider(props) {
  const [auth, setAuth] = useState({});
  const [userRoles, setUserRoles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");
    const roles = localStorage.getItem("userRoles") || [];
    if (token && email) {
      setAuth({ authToken: token, emailToken: email, userName, userId });
      setUserRoles(roles);
      setIsAdmin(roles.includes("admin"));
    }
  }, []);

  return (
    <Auth_Context.Provider
      value={{ auth, setAuth, userRoles, setUserRoles, isAdmin, cart, setCart }}
    >
      {props.children}
    </Auth_Context.Provider>
  );
}
