const database = require("../database/inMemoryDb");

const createUser = async (req, res) => {
  try {
    const { email, name, password, type } = req.body;

    // Check if email already exists
    if (database.emailExists(email)) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create user
    const user = await database.createUser({
      email,
      name,
      password,
      type: type || "standard",
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = database.getAllUsers();
    res.json({ users });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = database.getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, password, type } = req.body;

    // Check if user exists
    const existingUser = database.getUserById(id);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if email already exists (excluding current user)
    if (email && database.emailExists(email, parseInt(id))) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Update user
    const updatedUser = await database.updateUser(id, {
      email,
      name,
      password,
      type,
    });

    res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ error: "Cannot delete your own account" });
    }

    // Check if user exists and delete
    const deleted = database.deleteUser(id);
    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
