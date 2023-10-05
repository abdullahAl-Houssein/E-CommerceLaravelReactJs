import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Auth_Context } from "../ContextAuth/AuthContext";
import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const isAuth = useContext(Auth_Context);
  useEffect(() => {
    const authToken = localStorage.getItem("token");

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${isAuth.auth.authToken}`,
          },
        });

        if (response.status === 200) {
          setUserData(response.data.user);
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (authToken) {
      fetchUserProfile();
    }
  }, []);

  return (
    <div className="profile-container">
      <h1 className="profile-header">Profile</h1>
      <img
        className="img-user"
        src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
      />
      {userData ? (
        <div className="profile-info">
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
