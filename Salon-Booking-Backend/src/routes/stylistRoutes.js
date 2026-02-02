const express = require("express");
const router = express.Router();
const stylistController = require("../controllers/stylistController");

router.post("/", stylistController.createStylist);
router.get("/", stylistController.getStylists);

module.exports = router;
