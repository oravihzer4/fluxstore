const User = require("./mongodb/User");

// Register new User
const registerUser = async (newUser) => {
  try {
    let user = new User(newUser);
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
module.exports = { registerUser, getUser, getAllUsers, deleteUser };
