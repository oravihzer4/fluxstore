const jwt = require("jsonwebtoken");
const SECRET_KEY = "fluxer";

// Generate auth Token
const generateAuthToken = (user) => {
  const payload = {
    _id: user._id,
    isAdmin: user.isAdmin,
    isSignedUp: user.isSignedUp,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
};

// Verify auth Token
const verifyAuthToken = (token) => {
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    return payload;
  } catch (error) {
    return null;
  }
};
module.exports = { generateAuthToken, verifyAuthToken };
