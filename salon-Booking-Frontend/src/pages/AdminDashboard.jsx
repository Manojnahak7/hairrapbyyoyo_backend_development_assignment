import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await api.get("/bookings");
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/bookings/${id}/status`, { status });
    fetchBookings();
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    await api.delete(`/bookings/${id}`);
    fetchBookings();
  };

  return (
    <>
      <Navbar />

      <div className="admin-layout">
        <AdminSidebar />

        <div className="admin-content">
          <h2>Bookings</h2>

          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.User?.name}</td>
                  <td>{b.Service?.name}</td>
                  <td>{b.date}</td>
                  <td>{b.time}</td>

                  <td>
                    <select
                      value={b.status}
                      onChange={(e) => updateStatus(b.id, e.target.value)}
                    >
                      <option>PENDING</option>
                      <option>CONFIRMED</option>
                      <option>COMPLETED</option>
                      <option>CANCELLED</option>
                    </select>
                  </td>

                  <td>
                    <button
                      className="danger"
                      onClick={() => deleteBooking(b.id)}
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
    </>
  );
}
