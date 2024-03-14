const mongoose = require("mongoose");
const { DB_HOST } = require("./config");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Connection done");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectMongoDB;
