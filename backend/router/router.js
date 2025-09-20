const express = require("express");
const productRouter = require("../products/routes/productRestController");
const userRouter = require("../users/routes/userRestController");
const orderRouter = require("../orders/routes/orderRestController");

const router = express.Router();

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);

router.use((req, res) => {
  res.status(404).send("Path Not Found");
});

module.exports = router;
