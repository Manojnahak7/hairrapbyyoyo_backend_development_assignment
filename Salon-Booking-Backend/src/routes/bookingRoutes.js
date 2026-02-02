const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

router.post("/", protect, bookingController.createBooking);

// USER
router.get("/my", protect, bookingController.getMyBookings);

// ADMIN
router.get("/", protect, adminOnly, bookingController.getBookings);
router.put(
  "/:id/status",
  protect,
  adminOnly,
  bookingController.updateBookingStatus,
);
router.delete("/:id", protect, adminOnly, bookingController.deleteBooking);

module.exports = router;
