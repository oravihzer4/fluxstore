const express = require("express");
const Order = require("../models/orderModel");
const auth = require("../../auth/authService");
const router = express.Router();

// Create new order
router.post("/", auth, async (req, res) => {
  try {
    const userFromDB =
      await require("../../users/models/mongodb/User").findById(req.user._id);
    if (!userFromDB) {
      return res.status(404).send("User not found");
    }
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).send("No items in order");
    }
    const userName = {
      first: userFromDB.name?.first || "",
      middle: userFromDB.name?.middle || "",
      last: userFromDB.name?.last || "",
    };
    const addr = userFromDB.address || {};
    const userAddress = `${addr.street || ""} ${addr.houseNumber || ""}, ${
      addr.city || ""
    }, ${addr.country || ""}`;
    const order = new Order({
      user: userFromDB._id,
      userName,
      userAddress,
      items,
    });
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get all orders (admin only)
router.get("/", auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("Admins only");
  }
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
