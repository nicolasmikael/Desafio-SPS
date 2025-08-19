const { authService } = require("../services");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });

    res.status(200).json({
      message: "Login successful",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = authService.getProfile(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Get profile error:", error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

module.exports = {
  login,
  getProfile,
};
