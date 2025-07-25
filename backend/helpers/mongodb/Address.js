const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("./mongooseValidator");

const Address = new mongoose.Schema({
  state: {
    type: String,
    maxLength: 256,
    trim: true,
  },
  country: DEFAULT_VALIDATION,
  city: DEFAULT_VALIDATION,
  street: DEFAULT_VALIDATION,
  houseNumber: {
    type: Number,
    required: true,
    min: 1,
  },
  zipCode: {
    type: Number,
    default: 0,
  },
});

module.exports = Address;
