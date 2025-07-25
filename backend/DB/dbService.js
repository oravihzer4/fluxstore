const connectToAtlas = require("./mongodb/connectToAtlas");
const connectToLocalDB = require("./mongodb/connectToMongoDBLocally");

const ENVIRONMENT = "development";
const connectToDB = async () => {
  if (ENVIRONMENT === "development") {
    await connectToLocalDB();
  }
  if (ENVIRONMENT === "production") {
    await connectToAtlas();
  }
};

module.exports = connectToDB;
