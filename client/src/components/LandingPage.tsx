// src/components/LandingPage.tsx
import React from "react";
import GoogleLoginButton from "./GoogleLoginButton";

const LandingPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to Mern Project</h1>
      <p>Please log in to continue</p>
      <GoogleLoginButton />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    textAlign: "center" as const,
  },
};

export default LandingPage;
