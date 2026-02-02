const Stylist = require("../models/Stylist");

// CREATE STYLIST
exports.createStylist = async (req, res) => {
  try {
    const { name, specialization } = req.body;

    if (!name || !specialization) {
      return res.status(400).json({ message: "All fields required" });
    }

    const stylist = await Stylist.create({ name, specialization });
    res.status(201).json(stylist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET STYLISTS
exports.getStylists = async (req, res) => {
  try {
    const stylists = await Stylist.findAll();
    res.json(stylists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
