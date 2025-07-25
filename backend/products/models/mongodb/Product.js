const mongoose = require("mongoose");
const {
  DEFAULT_VALIDATION,
} = require("../../../helpers/mongodb/mongooseValidator");
const Image = require("../../../helpers/mongodb/Images");

const ProductSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  title: DEFAULT_VALIDATION,
  description: { ...DEFAULT_VALIDATION, maxLength: 1024 },
  category: DEFAULT_VALIDATION,
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  inStock: {
    type: Boolean,
    default: true,
    required: false,
  },
  image: Image,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
