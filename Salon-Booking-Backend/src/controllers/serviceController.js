const Service = require("../models/Service");

// CREATE service
exports.createService = async (req, res) => {
  try {
    const { name, price, duration } = req.body;

    if (!name || !price || !duration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const service = await Service.create({ name, price, duration });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all services
exports.getServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const services = await Service.findAndCountAll({
      limit,
      offset,
    });

    res.json({
      total: services.count,
      page,
      data: services.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET single service
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE service
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await service.update(req.body);
    res.json({ message: "Service updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await service.destroy();
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
