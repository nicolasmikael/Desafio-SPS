const { userService } = require("../services");

const createUser = async (req, res) => {
  try {
    const { email, name, password, type } = req.body;
    const user = await userService.createUser({ email, name, password, type });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Create user error:", error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = userService.getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Get all users error:", error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Get user by ID error:", error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, password, type } = req.body;
    const updatedUser = await userService.updateUser(id, {
      email,
      name,
      password,
      type,
    });

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update user error:", error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(req.user, id);

    res.status(204).send();
  } catch (error) {
    console.error("Delete user error:", error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
