import { useState } from "react";
import UserChatbot from "../components/userChatbot";
import "../styles/ChatPage.css";
import logo from "../assets/logo.jpg";
import { FiEdit, FiSettings } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ChatPage() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mode, setMode] = useState("home"); // home | chat

  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="chatgpt-layout">
      {/* ===== SIDEBAR ===== */}
      <aside className={`chatgpt-sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          {!collapsed && <img src={logo} alt="logo" className="sidebar-logo" />}
          <div
            className="sidebar-toggle"
            onClick={() => setCollapsed(!collapsed)}
          >
            <div className="chatgpt-toggle-icon">
              <span className="panel"></span>
              <span className="panel"></span>
            </div>
          </div>
        </div>

        {!collapsed && (
          <>
            <div className="new-chat-row" onClick={() => setMode("home")}>
              <FiEdit className="new-chat-icon" />
              <span>New Chat</span>
            </div>

            <div className="sidebar-section">Chat History</div>
            <div className="sidebar-subtitle">Today</div>

            <div
              className={`chat-item ${mode === "chat" ? "active" : ""}`}
              onClick={() => setMode("chat")}
            >
              <b>Book an Appointment</b>
              <p>Haircut, styling, spa & grooming services</p>
            </div>

            <div className="chat-item">
              <b>Wellness Coach</b>
              <p>Hair & scalp care tips for today</p>
            </div>

            <div className="chat-item">
              <b>Explore Services</b>
              <p>Prices, duration & service details</p>
            </div>

            <div className="chat-item">
              <b>Salon Products</b>
              <p>Hair care, beard care & styling products</p>
            </div>

            <div className="sidebar-subtitle">Yesterday</div>

            <div className="chat-item">
              <b>My Appointments</b>
              <p>View, reschedule or cancel bookings</p>
            </div>
          </>
        )}
      </aside>

      <main className="chatgpt-main">
        {/* TOP BAR */}
        <div className="chatgpt-topbar">
          <div className="user-avatar" onClick={() => setOpen(!open)}>
            <FaUserCircle size={28} />
          </div>

          {open && (
            <div className="profile-dropdown">
              <div onClick={() => navigate("/dashboard")}>Dashboard</div>
              <div onClick={logout}>Logout</div>
            </div>
          )}
        </div>

        <div className="chat-mode-wrapper">
          <UserChatbot />
        </div>
      </main>
    </div>
  );
}
