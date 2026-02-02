import { Link } from "react-router-dom";
import "../styles/admin.css";

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <h3>Admin Panel</h3>

      <nav>
        <Link to="/admin">Bookings</Link>
        <Link to="/admin/services">Services</Link>
        <Link to="/admin/add-service">Add Service</Link>
      </nav>
    </aside>
  );
}
