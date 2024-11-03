import React from "react";
import "../App.css";
const GoogleLoginButton: React.FC = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8000/api/auth/google";
  };

  return (
    <button onClick={handleLogin} className="LoginWithGoogleBTN">
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;
