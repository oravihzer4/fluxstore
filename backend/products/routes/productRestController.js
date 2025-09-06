const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../models/productsAccessDataService");
const auth = require("../../auth/authService");

const router = express.Router();

// Create New Product
router.post("/", auth, async (req, res) => {
  try {
    const userInfo = req.user;
    if (!userInfo.isAdmin) {
      return res
        .status(403)
        .send("Access Denied: Admins Only Allowed To Create Products");
    }
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
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCard = req.body;
    let userInfo = req.user;
    if (!userInfo.isAdmin) {
      return res
        .status(403)
        .send("Access Denied: Admins Only Allowed To Update Products");
    }
    let product = await updateProduct(id, updatedCard);
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete Product
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userInfo = req.user;
    if (!userInfo.isAdmin) {
      return res
        .status(403)
        .send("Access Denied: Admins Only Allowed To Delete Products");
    }
    let product = await deleteProduct(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
