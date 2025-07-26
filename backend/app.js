const express = require("express");
const connectToDB = require("./DB/dbService");
const router = require("./router/router");
const corsMiddleware = require("./middlewares/cors");

const app = express();
const PORT = 8182;

app.use(express.json());

app.use((req, res, next) => {
  console.log(
    `Request Method: ${req.method}, Request URL: ${
      req.url
    } | Time: ${new Date().toISOString()}`
  );
  next();
});

app.use(corsMiddleware);

app.use(router);

app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(500).send({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB();
});
