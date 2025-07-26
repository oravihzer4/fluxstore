const { verifyAuthToken } = require("./providers/jwt");

const TOKEN_GENERATOR = "jwt";

const auth = (req, res, next) => {
  if (TOKEN_GENERATOR === "jwt") {
    try {
      const tokenFromClient = req.header("x-auth-token");
      if (!tokenFromClient) {
        throw new Error("Authentication Error: Please Login");
      }

      const userInfo = verifyAuthToken(tokenFromClient);
      if (!userInfo) {
        throw new Error("Authentication Error: Unauthorize Token");
      }

      req.user = userInfo;
      return next();
    } catch (error) {
      return res.status(401).send(error.message);
    }
  }
  return res.status(500).send("Authentication Error: Invalid Token Generator");
};

module.exports = auth;
