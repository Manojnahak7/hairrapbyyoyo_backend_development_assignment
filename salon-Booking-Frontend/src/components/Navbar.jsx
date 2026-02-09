// import { Link, useNavigate } from "react-router-dom";
// import "../styles/Navbar.css";
// import logo from "../assets/logo.jpg";
// import { useState } from "react";

// // React Icons
// import { FiBell, FiMessageSquare } from "react-icons/fi";
// import { FaUserCircle } from "react-icons/fa";
// import { MdDashboard, MdLogout } from "react-icons/md";
// import {
//   FiHome,
//   FiScissors,
//   FiInfo,
//   FiPhone,
//   FiChevronDown,
//   FiLock,
//   FiUser,
// } from "react-icons/fi";
// import { FaRobot } from "react-icons/fa";
// import UserChatbot from "./UserChatbot";
// import AdminAIChat from "./AdminAIChat";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [showChat, setShowChat] = useState(false);

//   const token = localStorage.getItem("token");
//   const profileImage = localStorage.getItem("profileImage"); // optional

//   const handleLogout = () => {
//     localStorage.clear();
//     setOpen(false);
//     navigate("/");
//   };

//   const goDashboard = () => {
//     const role = localStorage.getItem("role");

//     setOpen(false);

//     if (role === "ADMIN") {
//       navigate("/admin");
//     } else {
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <header className="navbar">
//       {/* LEFT */}
//       <div className="navbar-left">
//         <img src={logo} alt="Logo" className="navbar-logo" />
//       </div>

//       {/* CENTER */}
//       <nav className="navbar-center">
//         <Link to="/" className="nav-link">
//           <FiHome /> Home <FiChevronDown />
//         </Link>

//         <Link to="/services" className="nav-link">
//           <FiScissors /> Services <FiChevronDown />
//         </Link>

//         <Link to="/about" className="nav-link">
//           <FiInfo /> About Us <FiChevronDown />
//         </Link>

//         <Link to="/contact" className="nav-link">
//           <FiPhone /> Contact <FiChevronDown />
//         </Link>
//       </nav>

//       {/* RIGHT */}
//       <div className="navbar-right">
//         {!token ? (
//           <>
//             {/* AI CHAT ICON */}
//             <div className="icon-wrap" onClick={() => setShowChat(true)}>
//               <FaRobot />
//             </div>

//             <Link to="/login" className="login-btn">
//               <FiLock /> Login
//             </Link>

//             <Link to="/register" className="register-btn">
//               <FiUser /> Register
//             </Link>
//           </>
//         ) : (
//           <div className="user-menu">
//             {/* Notification */}
//             <div className="icon-wrap">
//               <FiBell />
//             </div>

//             {/* Messages */}
//             <div className="icon-wrap">
//               <FiMessageSquare />
//             </div>

//             {/* Profile */}
//             <div className="user-avatar" onClick={() => setOpen(!open)}>
//               {profileImage ? (
//                 <img src={profileImage} alt="user" />
//               ) : (
//                 <FaUserCircle className="default-avatar" />
//               )}
//             </div>

//             {/* DROPDOWN */}
//             {open && (
//               <div className="profile-dropdown">
//                 <div className="dropdown-item" onClick={goDashboard}>
//                   <MdDashboard /> Dashboard
//                 </div>
//                 <div className="dropdown-item" onClick={handleLogout}>
//                   <MdLogout /> Logout
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.jpg";
import { useState } from "react";

// Icons
import { FiBell, FiMessageSquare } from "react-icons/fi";
import { FaUserCircle, FaRobot } from "react-icons/fa";
import { MdDashboard, MdLogout } from "react-icons/md";
import {
  FiHome,
  FiScissors,
  FiInfo,
  FiPhone,
  FiChevronDown,
  FiLock,
  FiUser,
} from "react-icons/fi";

export default function Navbar() {
  const navigate = useNavigate();
  const goChat = () => {
    navigate("/chat");
  };

  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const profileImage = localStorage.getItem("profileImage");

  const handleLogout = () => {
    localStorage.clear();
    setOpen(false);
    navigate("/");
  };

  const goDashboard = () => {
    setOpen(false);
    role === "ADMIN" ? navigate("/admin") : navigate("/dashboard");
  };

  return (
    <>
      <header className="navbar">
        {/* LEFT */}
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </div>

        {/* CENTER */}
        <nav className="navbar-center">
          <Link to="/" className="nav-link">
            <FiHome /> Home <FiChevronDown />
          </Link>

          <Link to="/services" className="nav-link">
            <FiScissors /> Services <FiChevronDown />
          </Link>

          <Link to="/about" className="nav-link">
            <FiInfo /> About Us <FiChevronDown />
          </Link>

          <Link to="/contact" className="nav-link">
            <FiPhone /> Contact <FiChevronDown />
          </Link>
        </nav>

        {/* RIGHT */}
        <div className="navbar-right">
          {/* 🤖 AI CHAT ICON */}
          {/* <div className="icon-wrap" onClick={goChat} title="AI Assistant">
            <FaRobot />
          </div> */}

          {token && (
            <div className="icon-wrap" onClick={goChat} title="AI Assistant">
              <FaRobot />
            </div>
          )}

          {!token ? (
            <>
              <Link to="/login" className="login-btn">
                <FiLock /> Login
              </Link>

              <Link to="/register" className="register-btn">
                <FiUser /> Register
              </Link>
            </>
          ) : (
            <div className="user-menu">
              <div className="icon-wrap">
                <FiBell />
              </div>

              <div className="icon-wrap">
                <FiMessageSquare />
              </div>

              <div className="user-avatar" onClick={() => setOpen(!open)}>
                {profileImage ? (
                  <img src={profileImage} alt="user" />
                ) : (
                  <FaUserCircle className="default-avatar" />
                )}
              </div>

              {open && (
                <div className="profile-dropdown">
                  <div className="dropdown-item" onClick={goDashboard}>
                    <MdDashboard /> Dashboard
                  </div>
                  <div className="dropdown-item" onClick={handleLogout}>
                    <MdLogout /> Logout
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* ================= AI CHAT OVERLAY ================= */}
      {/* {showChat && (
        <div className="chat-overlay" onClick={() => setShowChat(false)}>
          <div className="chat-drawer" onClick={(e) => e.stopPropagation()}>
            <span className="close-chat" onClick={() => setShowChat(false)}>
              ✖
            </span>

            {role === "ADMIN" ? <AdminAIChat /> : <UserChatbot />}
          </div>
        </div>
      )} */}
    </>
  );
}
