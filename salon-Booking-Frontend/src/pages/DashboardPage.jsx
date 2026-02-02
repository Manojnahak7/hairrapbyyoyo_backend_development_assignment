import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/DashboardPage.css";

import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import api from "../api/api";

import {
  FiGrid,
  FiHeart,
  FiCreditCard,
  FiStar,
  FiMessageCircle,
  FiSettings,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";

export default function DashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");

  //  FETCH REAL BOOKINGS OF LOGGED-IN USER
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const userId = JSON.parse(atob(token.split(".")[1])).id;

    api;
    api
      .get("/bookings/my")

      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, []);

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api
      .get("/users/me")
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, []);

  //  FILTER BY TAB
  const filteredBookings =
    activeTab === "ALL"
      ? bookings
      : bookings.filter((b) => b.status === activeTab);

  //  COUNTS
  const counts = {
    ALL: bookings.length,
    PENDING: bookings.filter((b) => b.status === "PENDING").length,
    COMPLETED: bookings.filter((b) => b.status === "COMPLETED").length,
    CANCELLED: bookings.filter((b) => b.status === "CANCELLED").length,
  };

  return (
    <>
      <Navbar />

      {/* BANNER */}
      <div className="dashboard-banner">
        <h2>Dashboard</h2>
        <p>Home › Customer › Dashboard</p>
      </div>

      <div className="dashboard-page">
        <div className="dashboard-wrapper">
          {/* SIDEBAR */}
          <aside className="dashboard-sidebar">
            <div className="profile-card">
              {/*  DEFAULT ICON */}
              <FaUserCircle size={80} color="#aaa" />
              <h4>{profile ? profile.name : "User"}</h4>

              <span>
                {profile
                  ? `Member since ${new Date(profile.createdAt).getFullYear()}`
                  : ""}
              </span>
            </div>

            <ul className="sidebar-menu">
              <li>
                <FiGrid /> Dashboard
              </li>

              <li className="active">
                <FiGrid /> Bookings
              </li>

              <li>
                <FiHeart /> Favorites
              </li>

              <li>
                <FiCreditCard /> Wallet
              </li>

              <li>
                <FiStar /> Reviews
              </li>

              <li>
                <FiMessageCircle /> Chat
              </li>

              <li className="has-arrow">
                <span>
                  <FiSettings /> Settings
                </span>
                <FiChevronRight />
              </li>

              <li
                className="logout"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                <FiLogOut /> Logout
              </li>
            </ul>
          </aside>

          {/* CONTENT */}
          <main className="dashboard-content">
            {/* TABS */}
            <div className="booking-tabs">
              {["ALL", "PENDING", "CANCELLED", "COMPLETED"].map((tab) => (
                <div
                  key={tab}
                  className={`tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab} ({counts[tab]})
                </div>
              ))}

              <div className="sort">Sort by ↕</div>
            </div>

            {/* BOOKINGS */}
            {filteredBookings.length === 0 ? (
              <p style={{ padding: "20px" }}>No bookings found</p>
            ) : (
              filteredBookings.map((b) => (
                <div className="booking-card" key={b.id}>
                  <div className="card-top">
                    <label>
                      <input type="checkbox" />
                      {/* {b.Service?.name || "Hair Cut"} */}
                      {"Hair Cut"}
                    </label>

                    <span className={`status ${b.status.toLowerCase()}`}>
                      {b.status}
                    </span>
                  </div>

                  <small># {b.id}</small>

                  <div className="card-bottom">
                    <span>
                      <b>Booking Date</b> {b.date} · {b.time}
                    </span>

                    <span>
                      <b>Total paid</b> ₹{b.Service?.price}
                    </span>

                    <span className="details">Booking Details →</span>
                  </div>
                </div>
              ))
            )}
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}
