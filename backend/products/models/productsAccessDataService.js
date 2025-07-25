const Product = require("./mongodb/Product");

const DB = "MONGODB";

// Create Product
const createProduct = async (productData) => {
  if (DB === "MONGODB") {
    try {
      let product = new Product(productData);
      product = await product.save();
      return product;
    } catch (error) {
      throw new Error(`Mongoose: ${error.message}`);
    }
  }
};
// Get All Products
const getAllProducts = async () => {
  try {
    let products = await Product.find({});
    return products;
  } catch (error) {
    throw new Error(`Mongoose: ${error.message}`);
  }
};
// Get Product by ID
const getProductById = async (id) => {
  try {
    let product = await Product.findById(id);
    return product;
  } catch (error) {
    throw new Error(`Mongoose: ${error.message}`);
  }
};

// Update Product (Admin Only)
const updateProduct = async (id, updatedProduct) => {
  try {
    let product = await Product.findByIdAndUpdate(id, updatedProduct, {
      new: true,
    });
    return product;
  } catch (error) {
    throw new Error(`Mongoose: ${error.message}`);
  }
};
// Delete Product (Admin Only)
const deleteProduct = async (id) => {
  try {
    let card = await Product.findByIdAndDelete(id);
    return card;
  } catch (error) {
    throw new Error(`Mongoose: ${error.message}`);
  }
};
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
