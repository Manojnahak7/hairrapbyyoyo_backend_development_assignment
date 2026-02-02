import { Navigate } from "react-router-dom";
import { isLoggedIn, getRole } from "../utils/auth";

export default function AdminProtectedRoute({ children }) {
  if (!isLoggedIn()) return <Navigate to="/login" />;
  if (getRole() !== "ADMIN") return <Navigate to="/" />;

  return children;
}
