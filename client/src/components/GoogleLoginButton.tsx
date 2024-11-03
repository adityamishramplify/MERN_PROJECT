// src/components/GoogleLoginButton.tsx
import React from "react";

const GoogleLoginButton: React.FC = () => {
  const handleLogin = () => {
    // Redirect to the backend's Google login route
    window.location.href = "http://localhost:8000/api/auth/google";
  };

  return (
    <button onClick={handleLogin} style={styles.button}>
      Login with Google
    </button>
  );
};

const styles = {
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#4285F4",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default GoogleLoginButton;
