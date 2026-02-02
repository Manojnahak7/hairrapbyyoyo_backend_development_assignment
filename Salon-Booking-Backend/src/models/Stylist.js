const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Stylist = sequelize.define("Stylist", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Stylist;
