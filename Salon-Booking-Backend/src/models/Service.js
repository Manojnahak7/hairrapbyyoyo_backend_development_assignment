const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Service = sequelize.define("Service", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 4.5,
  },

  image: {
    type: DataTypes.STRING,
  },

  createdBy: {
    type: DataTypes.STRING,
  },
});

module.exports = Service;
