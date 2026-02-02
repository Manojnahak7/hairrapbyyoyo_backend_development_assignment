import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // role based redirect
      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <form onSubmit={handleLogin} style={styles.form}>
          <h2 style={{ marginBottom: "20px" }}>Login</h2>

          {error && <p style={styles.error}>{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Login
          </button>

          <p style={{ marginTop: "12px", textAlign: "center" }}>
            New user?{" "}
            <span
              style={{ color: "#e91e63", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </form>
      </div>

      <Footer />
    </>
  );
}

const styles = {
  container: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f7f7f7",
  },
  form: {
    width: "380px",
    padding: "32px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 14px rgba(0,0,0,0.12)",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#e91e63",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    boxSizing: "border-box",
  },
  error: {
    color: "red",
    marginBottom: "12px",
    fontSize: "14px",
  },
};
