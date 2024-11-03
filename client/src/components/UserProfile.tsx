import React, { useEffect, useState } from "react";

interface User {
  name: string;
  email?: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/auth/current_user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        setError("Failed to load user data. Please try again.");
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    window.location.href = "http://localhost:8000/api/auth/logout";
  };

  return (
    <div style={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : user ? (
        <>
          <h2>Welcome, {user.name}</h2>
          {user.email && <p>Email: {user.email}</p>}
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </>
      ) : (
        <p>Please log in to see your profile.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center" as const,
    margin: "20px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  logoutButton: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#D9534F",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "20px",
  },
  error: {
    color: "red",
  },
};

export default UserProfile;
