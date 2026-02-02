import { useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";

export default function AdminAddService() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    duration: "",
    location: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("duration", form.duration);
    fd.append("location", form.location);
    if (image) fd.append("image", image);

    try {
      setLoading(true);
      await api.post("/admin/services", fd);
      alert("✅ Service Added Successfully");

      setForm({ name: "", price: "", duration: "", location: "" });
      setImage(null);
    } catch (err) {
      alert("❌ Failed to add service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="admin-layout">
        <AdminSidebar />

        <div className="admin-content">
          <h2>Add Service</h2>

          <form className="admin-card" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Service Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Hair Cut"
                  required
                />
              </div>

              <div className="form-group">
                <label>Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. 499"
                  required
                />
              </div>

              <div className="form-group">
                <label>Duration (mins)</label>
                <input
                  type="number"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="e.g. 45"
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. New Jersey, USA"
                  required
                />
              </div>

              <div className="form-group full">
                <label>Service Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>

            <button className="primary-btn" disabled={loading}>
              {loading ? "Adding..." : "Add Service"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
