const express = require("express");
const router = express.Router();

const { handleBookingChat } = require("../controllers/userChatController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/booking", protect, handleBookingChat);

module.exports = router;
