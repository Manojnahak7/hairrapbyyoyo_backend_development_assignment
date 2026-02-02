import { BrowserRouter, Routes, Route } from "react-router-dom";
import ServicesPage from "./pages/ServicesPage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import AdminAddService from "./pages/AdminAddService";
import AdminServices from "./pages/AdminServices";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ServicesPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/booking/:serviceId" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <AdminProtectedRoute>
              <AdminServices />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/add-service"
          element={
            <AdminProtectedRoute>
              <AdminAddService />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/booking/:serviceId"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="CUSTOMER">
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
