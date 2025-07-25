const mongoose = require("mongoose");
const connectToLocalDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/fluxServer");
    console.log("Connected to MongoDB Locally");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};
module.exports = connectToLocalDB;
