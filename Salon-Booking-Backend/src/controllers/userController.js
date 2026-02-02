const User = require("../models/User");

// CREATE USER
exports.createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email required" });
    }

    const user = await User.create({
      name,
      email,
      role: role || "CUSTOMER",
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await user.update(req.body);
  res.json({ message: "User updated" });
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await user.destroy();
  res.json({ message: "User deleted" });
};

exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["name", "createdAt"],
    });

    res.json({
      name: user.name,
      createdAt: user.createdAt,
    });
  } catch (err) {
    console.error("GET PROFILE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
