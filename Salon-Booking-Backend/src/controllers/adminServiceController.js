const Service = require("../models/Service");

exports.createServiceWithImage = async (req, res) => {
  try {
    const { name, price, duration, location, rating } = req.body;

    if (!name || !price || !duration || !location) {
      return res.status(400).json({ message: "All fields required" });
    }

    const service = await Service.create({
      name,
      price: Number(price),
      duration: Number(duration),
      location,
      rating: rating ? Number(rating) : 4.5,
      image: req.file ? `/uploads/services/${req.file.filename}` : null,
      createdBy: String(req.user?.id || "ADMIN"),
    });

    res.status(201).json(service);
  } catch (err) {
    console.error("CREATE SERVICE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await service.destroy();
    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    console.error("DELETE SERVICE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { name, price, location } = req.body;

    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    service.name = name;
    service.price = price;
    service.location = location;

    if (req.file) {
      service.image = `/uploads/services/${req.file.filename}`;
    }

    await service.save();

    res.json(service);
  } catch (err) {
    console.error("UPDATE SERVICE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
