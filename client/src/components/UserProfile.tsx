import React from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading, error } = useUser();

  const handleLogout = () => {
    window.location.href = "http://localhost:8000/api/auth/logout";
  };

  return (
    <div className="user-profile-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : user ? (
        <>
          <div className="user-profile-info">
            <h2 className="userName">Welcome, {user.displayName}</h2>
            {user.email && <p className="userEmail">Email: {user.email}</p>}
          </div>

          <div className="navbar-pannel">
            <button
              className="navbar-button"
              onClick={() => navigate("/products")}
            >
              All Products
            </button>
            <button
              className="navbar-button"
              onClick={() => navigate("/add-product")}
            >
              Add Product
            </button>

            <button
              onClick={handleLogout}
              className="navbar-button"
              id="logout-button"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <p>Please log in to see your profile.</p>
      )}
    </div>
  );
};

export default UserProfile;
