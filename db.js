require("dotenv").config();
const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToMongo;