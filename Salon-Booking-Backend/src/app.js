const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const syncDB = require("./config/sync");
const adminRoutes = require("./routes/adminRoutes");

const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const stylistRoutes = require("./routes/stylistRoutes");
const errorHandler = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const userChatRoutes = require("./routes/userChatRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
syncDB();

// ROUTES
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stylists", stylistRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads")); // IMAGE ACCESS
app.use("/api/admin", adminRoutes);
app.use(errorHandler);
app.use("/api/chat", userChatRoutes);

app.get("/", (req, res) => {
  res.send("Salon Booking Backend Running");
});

module.exports = app;
