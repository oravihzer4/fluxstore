const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../models/productsAccessDataService");

const router = express.Router();
// Create New Product
router.post("/", async (req, res) => {
  try {
    let product = await createProduct(req.body);
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// Get All Products
router.get("/", async (req, res) => {
  try {
    let allProducts = await getAllProducts();
    res.status(200).send(allProducts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// Get Product by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//update product
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let product = await updateProduct(id, req.body);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// Delete Product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let product = await deleteProduct(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
