import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register", form);
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={{ marginBottom: "20px" }}>Register</h2>

          {error && <p style={styles.error}>{error}</p>}

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Registering..." : "Register"}
          </button>

          <p style={{ marginTop: "15px" }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f6f6f6",
    paddingTop: "72px",
    boxSizing: "border-box",
  },

  form: {
    width: "100%",
    maxWidth: "420px",
    padding: "32px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    boxSizing: "border-box",
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#e91e63",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },

  error: {
    color: "red",
    marginBottom: "12px",
    fontSize: "14px",
  },
};
