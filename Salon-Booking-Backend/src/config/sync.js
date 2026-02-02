const { sequelize } = require("./db");

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ All Tables Synced");
  } catch (error) {
    console.error(" Sync Failed:", error);
  }
};

module.exports = syncDB;
