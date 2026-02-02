const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const adminServiceController = require("../controllers/adminServiceController");

router.post(
  "/services",
  protect,
  adminOnly,
  upload.single("image"),
  adminServiceController.createServiceWithImage,
);

router.put(
  "/services/:id",
  protect,
  adminOnly,
  upload.single("image"),
  adminServiceController.updateService,
);
router.delete(
  "/services/:id",
  protect,
  adminOnly,
  adminServiceController.deleteService,
);

module.exports = router;
