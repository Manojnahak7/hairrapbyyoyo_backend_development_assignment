const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const Service = require("./Service");
const Stylist = require("./Stylist");

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"),
    defaultValue: "CONFIRMED",
  },
});

// Relations
User.hasMany(Booking);
Booking.belongsTo(User);

Service.hasMany(Booking);
Booking.belongsTo(Service);

Stylist.hasMany(Booking);
Booking.belongsTo(Stylist);

module.exports = Booking;
