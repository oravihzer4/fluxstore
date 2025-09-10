const express = require("express");
const {
  registerUser,
  getUser,
  getAllUsers,
  deleteUser,
  loginUser,
} = require("../models/userAccessDataService");
const auth = require("../../auth/authService");
const router = express.Router();

// Create New User
router.post("/", async (req, res) => {
  try {
    let newUser = req.body;
    let user = await registerUser(newUser);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// Get current logged-in user
router.get("/me", auth, async (req, res) => {
  try {
    const user = await getUser(req.user._id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// Get User by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    let userInfo = req.user;
    let user = await getUser(id);
    if (userInfo._id !== id && !userInfo.isAdmin) {
      return res
        .status(403)
        .send("Access Denied: You can only access your own user data");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get All Users
router.get("/", auth, async (req, res) => {
  let userInfo = req.user;
  if (!userInfo.isAdmin) {
    return res
      .status(403)
      .send("Access Denied: Admins Only Allowed To Get All Users List");
  }
  try {
    let users = await getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete User
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let user = await deleteUser(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    const token = await loginUser(email, password);
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
