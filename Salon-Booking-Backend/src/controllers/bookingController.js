const Booking = require("../models/Booking");
const User = require("../models/User");
const Service = require("../models/Service");
const Stylist = require("../models/Stylist");

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user.id },
      include: ["Service"],
      order: [["createdAt", "DESC"]],
    });

    res.json(bookings);
  } catch (err) {
    console.error("GET MY BOOKINGS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const { userId, serviceId, stylistId, date, time } = req.body;

    // Validation
    if (!userId || !serviceId || !stylistId || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check user exists
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check service exists
    const service = await Service.findByPk(serviceId);
    if (!service) return res.status(404).json({ message: "Service not found" });

    // Check stylist exists
    const stylist = await Stylist.findByPk(stylistId);
    if (!stylist) return res.status(404).json({ message: "Stylist not found" });

    //  Double booking check
    const existingBooking = await Booking.findOne({
      where: { stylistId, date, time },
    });

    if (existingBooking) {
      return res
        .status(409)
        .json({ message: "Time slot already booked for this stylist" });
    }

    // Create booking
    await Booking.create({
      UserId: userId,
      ServiceId: serviceId,
      StylistId: stylistId,
      date,
      time,
      status: "CONFIRMED",
    });

    res.status(201).json({
      success: true,
      message: "Booking confirmed",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET BOOKINGS (Dashboard / My bookings)
exports.getBookings = async (req, res) => {
  try {
    const { userId } = req.query;

    const filter = userId ? { where: { UserId: userId } } : {};

    const bookings = await Booking.findAll({
      ...filter,
      include: [
        { model: User, attributes: ["name"] },
        { model: Service, attributes: ["name", "price"] }, //  REQUIRED
        { model: Stylist, attributes: ["name"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE BOOKING STATUS
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    res.json({ message: "Booking status updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE / CANCEL BOOKING
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.destroy();
    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
