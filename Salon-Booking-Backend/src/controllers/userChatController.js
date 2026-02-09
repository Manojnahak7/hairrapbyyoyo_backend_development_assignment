const Booking = require("../models/Booking");
const Service = require("../models/Service");

const moment = require("moment");

function normalizeDate(input) {
  if (!input) return null;

  const text = input.toLowerCase();

  if (text === "today") {
    return moment().format("YYYY-MM-DD");
  }

  if (text === "tomorrow") {
    return moment().add(1, "day").format("YYYY-MM-DD");
  }

  if (moment(input, "YYYY-MM-DD", true).isValid()) {
    return input;
  }

  return null;
}

function normalizeTime(input) {
  if (!input) return null;

  // Accept HH:mm
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!timeRegex.test(input)) return null;

  // Convert HH:mm → HH:mm:ss
  return `${input}:00`;
}

exports.handleBookingChat = async (req, res) => {
  const { step, message, context } = req.body;
  const userId = req.user.id;

  // STEP 0 – START
  if (!step) {
    const services = await Service.findAll();

    return res.json({
      step: "SERVICE",
      message: "Please select a service",
      options: services.map((s) => ({
        value: s.id,
        label: s.name,
      })),
    });
  }

  // STEP 1 – SERVICE
  if (step === "SERVICE") {
    const service = await Service.findOne({
      where: { name: message },
    });

    if (!service) {
      return res.json({ message: "Invalid service name" });
    }

    return res.json({
      step: "DATE",
      context: { serviceId: service.id },
      message: "Enter date:\nToday / Tomorrow / YYYY-MM-DD",
    });
  }

  // STEP 2 – DATE
  if (step === "DATE") {
    const normalizedDate = normalizeDate(message);

    if (!normalizedDate) {
      return res.json({
        message: "Invalid date. Use Today, Tomorrow, or YYYY-MM-DD",
      });
    }

    return res.json({
      step: "TIME",
      context: { ...context, date: normalizedDate },
      message: "Enter time in HH:MM format (eg 14:30)",
    });
  }

  // STEP 3 – TIME
  // if (step === "TIME") {
  //   return res.json({
  //     step: "CONFIRM",
  //     context: { ...context, time: message },
  //     message: "Confirm booking? (Yes / No)",
  //   });
  // }

  if (step === "TIME") {
    const normalizedTime = normalizeTime(message);

    if (!normalizedTime) {
      return res.json({
        message: "Invalid time. Use HH:mm format (eg 14:30)",
      });
    }

    return res.json({
      step: "CONFIRM",
      context: { ...context, time: normalizedTime },
      message: "Confirm booking? (Yes / No)",
    });
  }

  // STEP 4 – CONFIRM
  // if (step === "CONFIRM" && message.toLowerCase() === "yes") {
  //   await Booking.create({
  //     UserId: userId,
  //     ServiceId: context.serviceId,
  //     // StylistId: 1,
  //     StylistId: null,

  //     date: context.date,
  //     time: context.time,
  //     status: "CONFIRMED",
  //   });

  //   return res.json({
  //     step: "DONE",
  //     message: "🎉 You are successfully booked!",
  //   });
  // }

  if (step === "CONFIRM" && message.toLowerCase() === "yes") {
    try {
      const booking = await Booking.create({
        UserId: userId,
        ServiceId: context.serviceId,
        StylistId: null,
        date: context.date,
        time: context.time,
        status: "CONFIRMED",
      });

      return res.json({
        step: "DONE",
        message: "🎉 You are successfully booked!",
      });
    } catch (err) {
      console.error("BOOKING INSERT ERROR 👉", err);
      return res.status(500).json({
        message: "Booking failed",
        error: err.message,
      });
    }
  }

  return res.json({ message: "Booking cancelled" });
};
