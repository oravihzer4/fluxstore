const express = require("express");
const mongoose = require("mongoose");
const connectToDB = require("./DB/dbService");
const router = require("./router/router");

const app = express();
const PORT = 8182;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB();
});
