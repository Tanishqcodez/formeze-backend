let {setServers} = require("node:dns/promises")
setServers(["1.1.1.1", "8.8.8.8"])
require("dotenv").config();
require("dns").setDefaultResultOrder("ipv4first");
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
