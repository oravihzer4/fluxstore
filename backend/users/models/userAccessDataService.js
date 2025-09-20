const { generateAuthToken } = require("../../auth/providers/jwt");
const User = require("./mongodb/User");
const { generateUserPassword, comparePassword } = require("../helpers/bcrypt");

// Register new User
const registerUser = async (newUser) => {
  try {
    // Hash password before saving
    const userToSave = {
      ...newUser,
      password: generateUserPassword(newUser.password),
    };
    let user = new User(userToSave);
    user = await user.save();
    return user;
  } catch (error) {
    throw new Error(`Mongoose: ${error.message}`);
  }
};
// Get User
const getUser = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error(`Mongoose: ${error.message}`);
  }
};

// Get All Users
const getAllUsers = async () => {
  try {
    let users = await User.find({});
    return users;
  } catch (error) {
    throw new Error(`Mongoose: ${error.message}`);
  }
};

// Delete User (Admin Only)
const deleteUser = async (id) => {
  try {
    let user = await User.findByIdAndDelete(id);
    return user;
  } catch (error) {
    throw new Error(`Mongoose: ${error.message}`);
  }
};
// Login User

const loginUser = async (email, password) => {
  try {
    const userFromDB = await User.findOne({ email });
    if (!userFromDB) {
      throw new Error("Authentication Error: User not exist");
    }
    // Use bcrypt compare for password check
    const isMatch = comparePassword(password, userFromDB.password);
    if (!isMatch) {
      throw new Error("Authentication Error: Invalid password");
    }
    const token = generateAuthToken(userFromDB);
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { registerUser, getUser, getAllUsers, deleteUser, loginUser };
