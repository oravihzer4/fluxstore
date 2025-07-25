const mongoose = require("mongoose");
const { URL, DEFAULT_VALIDATION } = require("./mongooseValidator");

const Image = new mongoose.Schema({
  url: URL,
  alt: { ...DEFAULT_VALIDATION, required: false, minLength: 0 },
});
module.exports = Image;
