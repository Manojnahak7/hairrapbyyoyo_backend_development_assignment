const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { adminChat } = require("../controllers/adminAiController");

router.post("/chat", protect, adminOnly, adminChat);

module.exports = router;
