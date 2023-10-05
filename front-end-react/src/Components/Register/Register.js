import React, { useContext, useEffect, useState } from "react";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Auth_Context } from "../ContextAuth/AuthContext";

const Register = () => {
  const isAuth = useContext(Auth_Context);
  const nigative = useNavigate();
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const togglePanel = () => {
    setIsLoginActive(!isLoginActive);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const logData = {
      email: loginData.email,
      password: loginData.password,
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        logData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        const authToken = response.data.token;
        const userRoles = response.data.user_role;
        const emailToken = logData.email;
        const userName = response.data.username;
        const userId = response.data.id;

        localStorage.setItem("token", authToken);
        localStorage.setItem("email", emailToken);
        localStorage.setItem("userName", userName);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userRoles", JSON.stringify(userRoles));

        // Update the context
        isAuth.setAuth({
          authToken,
          emailToken,
          userName,
          userId
        });
        isAuth.setUserRoles(userRoles);
        
        nigative("/");
      } else {
        alert("login failed");
      }
    } catch (error) {
      console.error("An error occurred while logging in : ", error);
      alert("The data is incorrect");
    }
    console.log(logData);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const registrationData = {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      password_confirmation: registerData.password_confirmation,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        registrationData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
        const authToken = response.data.token;
        const emailToken = registerData.email;
        const userId = response.data.id;
        const userName = response.data.userName;

        localStorage.setItem("token", authToken);
        localStorage.setItem("email", emailToken);
        localStorage.setItem("userName", userName);
        localStorage.setItem("userId", userId);

        isAuth.setAuth({ authToken, emailToken, userName,userId });
        nigative("/");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("An error occurred while registering.");
    }
    console.log(registerData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isLoginActive) {
      setLoginData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setRegisterData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="auth-body">
      <div
        className={`  container-auth ${
          isLoginActive ? "" : "right-panel-active"
        }`}
        id="container"
      >
        <div className="form-container register-container">
          <form onSubmit={handleRegister}>
            <h1 className=".auth-h1">Register</h1>
            <input
              type="text"
              value={registerData.name}
              onChange={handleInputChange}
              name="name"
              placeholder="Name"
            ></input>
            <input
              type="email"
              value={registerData.email}
              onChange={handleInputChange}
              name="email"
              placeholder="Email"
            ></input>
            <input
              type="password"
              value={registerData.password}
              onChange={handleInputChange}
              name="password"
              placeholder="Password"
            ></input>
            <input
              type="password"
              alue={registerData.password_confirmation}
              name="password_confirmation"
              onChange={handleInputChange}
              placeholder="Confirm Password"
            ></input>
            <button className="button-auth">Register</button>
            <span className="span-auth">or use your account</span>
            <div className="social-container">
              <a className="a-auth social" href="#">
                <FaLinkedin />
              </a>
              <a className="a-auth social" href="#">
                <FaGoogle />
              </a>
              <a className="a-auth social" href="#">
                <FaFacebook />
              </a>
            </div>
          </form>
        </div>
        <div className="form-container login-container">
          <form method="post" onSubmit={handleLogin}>
            <h1 className=".auth-h1">Login</h1>
            <input
              type="email"
              required
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="password"
              required
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
            <div className="content">
              <div className="checkbox">
                <input type="checkbox" name="checkbox" id="checkbox" />
                <label>Remember me</label>
              </div>
              <div className="pass-link">
                <a className="a-auth" href="#">
                  Forgot password?
                </a>
              </div>
            </div>
            <button className="button-auth ">Login</button>
            <span className="span-auth">or use your account</span>
            <div className="social-container">
              <a className="a-auth social" href="#">
                <FaLinkedin />
              </a>
              <a className="a-auth social" href="#">
                <FaGoogle />
              </a>
              <a className="a-auth social" href="#">
                <FaFacebook />
              </a>
            </div>
          </form>
        </div>

        <div className="overlay-container">
          <div
            className={`overlay ${isLoginActive ? "" : "right-panel-active"}`}
          >
            <div className="overlay-panel overlay-left">
              <h1 className=".auth-h1 title">Hello friends</h1>
              <p className="p-auth">
                If you have an account, login here and have fun
              </p>
              <button className="button-auth ghost" onClick={togglePanel}>
                Login
                <i className="lni lni-arrow-left login"></i>
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className=".auth-h1 title">Start your journey now</h1>
              <p className="p-auth">
                If you don't have an account yet, join us and start your
                journey.
              </p>
              <button className="button-auth ghost" onClick={togglePanel}>
                Register
                <i className="lni lni-arrow-right register"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
