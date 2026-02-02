const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/me", protect, userController.getMyProfile);

module.exports = router;
