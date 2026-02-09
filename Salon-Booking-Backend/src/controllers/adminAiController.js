const Booking = require("../models/Booking");
const Service = require("../models/Service");
const OpenAI = require("openai");

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.adminChat = async (req, res) => {
  const { message } = req.body;

  let data = {};

  if (message.toLowerCase().includes("today")) {
    const today = new Date().toISOString().split("T")[0];
    const count = await Booking.count({ where: { date: today } });
    data = { todayBookings: count };
  }

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an admin assistant. Answer only using given JSON data.",
      },
      {
        role: "user",
        content: `Query: ${message}\nData:${JSON.stringify(data)}`,
      },
    ],
  });

  res.json({ reply: completion.choices[0].message.content });
};
