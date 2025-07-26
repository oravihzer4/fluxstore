const cors = require("cors");
const corsMiddleware = cors({
  origin: [
    "http://127.0.0.1:8182",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:5173/",
  ],
});
module.exports = corsMiddleware;
