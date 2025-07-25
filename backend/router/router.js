const express = require("express");
const productRouter = require("../products/routes/productRestController");
const userRouter = require("../users/routes/userRestController");

const router = express.Router();

router.use("/products", productRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(404).send("Path Not Found");
});

module.exports = router;
