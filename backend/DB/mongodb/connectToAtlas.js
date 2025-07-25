const mongoose = require("mongoose");
const connectionStringForAtlas = "";
const connectToAtlas = async () => {
  try {
    await mongoose.connect(connectionStringForAtlas);
    console.log("Connected to MongoDB in Atlas");
  } catch (error) {
    console.log("Error connecting to MongoDB Atlas:", error);
  }
};
module.exports = connectToAtlas;
