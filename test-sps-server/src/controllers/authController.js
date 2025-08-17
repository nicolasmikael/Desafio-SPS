const database = require("../database/inMemoryDb");
const { generateToken } = require("../middleware/auth");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = database.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Validate password
    const isValidPassword = await database.validatePassword(
      password,
      user.password
    );
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Return user data without password and token
    const userWithoutPassword = database.getUserWithoutPassword(user);

    res.json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = database.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userWithoutPassword = database.getUserWithoutPassword(user);
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  login,
  getProfile,
};
