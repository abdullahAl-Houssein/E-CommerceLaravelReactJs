import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/users", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setUsers(response.data.users);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>List of Users</h2>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          Loading
        </div>
      ) : (
        <div className="users-container">
          {users.map((user) => (
            <div className="user-card" key={user.id}>
              <img
                src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                alt={user.name}
                className="user-avatar"
              />
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              {user.roles.length > 0 ? (
                <div className="user-roles">
                  <span className="d-inline-block">Roles:</span>
                  <ul className="d-flex m-0">
                    {user.roles.map((role, index) => (
                      <li key={index}>{role.name}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No roles available</p>
              )}
              <div className="user-actions">
                <button className="edit-button">Edit</button>
                <button className="delete-button">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;
