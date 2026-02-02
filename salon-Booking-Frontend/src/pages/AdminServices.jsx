import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [newImage, setNewImage] = useState(null);

  //  LOAD SERVICES
  const loadServices = async () => {
    const res = await api.get("/services");
    setServices(res.data.data || res.data);
  };

  useEffect(() => {
    loadServices();
  }, []);

  //  DELETE SERVICE
  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    await api.delete(`/admin/services/${id}`);
    loadServices();
  };

  //  OPEN EDIT MODAL
  const openEdit = (service) => {
    setEditingService({ ...service });
    setNewImage(null);
  };

  //  HANDLE INPUT CHANGE
  const handleEditChange = (e) => {
    setEditingService({
      ...editingService,
      [e.target.name]: e.target.value,
    });
  };

  //  IMAGE CHANGE
  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  //  SAVE EDIT (WITH IMAGE)
  const saveEdit = async () => {
    const formData = new FormData();
    formData.append("name", editingService.name);
    formData.append("price", editingService.price);
    formData.append("location", editingService.location);

    if (newImage) {
      formData.append("image", newImage);
    }

    await api.put(`/admin/services/${editingService.id}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setEditingService(null);
    setNewImage(null);
    loadServices();
  };

  return (
    <>
      <Navbar />

      <div className="admin-layout">
        <AdminSidebar />

        <div className="admin-content">
          <h2>Services</h2>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {services.map((s) => (
                <tr key={s.id}>
                  <td className="center">
                    <img
                      src={`http://localhost:5000${s.image}`}
                      alt="service"
                      width="60"
                    />
                  </td>

                  <td className="center">{s.name}</td>
                  <td className="center">₹{s.price}</td>
                  <td className="center">{s.location}</td>

                  <td className="center">
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => openEdit(s)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => deleteService(s.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingService && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Edit Service</h3>

            {/* CURRENT IMAGE */}
            <img
              src={`http://localhost:5000${editingService.image}`}
              alt="current"
              width="120"
              style={{ marginBottom: "10px", borderRadius: "6px" }}
            />

            {/* NEW IMAGE */}
            <input type="file" accept="image/*" onChange={handleImageChange} />

            <input
              type="text"
              name="name"
              value={editingService.name}
              onChange={handleEditChange}
              placeholder="Service Name"
            />

            <input
              type="number"
              name="price"
              value={editingService.price}
              onChange={handleEditChange}
              placeholder="Price"
            />

            <input
              type="text"
              name="location"
              value={editingService.location}
              onChange={handleEditChange}
              placeholder="Location"
            />

            <div className="modal-actions">
              <button type="button" className="edit-btn" onClick={saveEdit}>
                Save
              </button>

              <button
                type="button"
                className="delete-btn"
                onClick={() => setEditingService(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
