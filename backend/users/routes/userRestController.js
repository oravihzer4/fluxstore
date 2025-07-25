const express = require("express");
const {
  registerUser,
  getUser,
  getAllUsers,
  deleteUser,
} = require("../models/userAccessDataService");
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

// Get User by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUser(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get All Users
router.get("/", async (req, res) => {
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
module.exports = router;
