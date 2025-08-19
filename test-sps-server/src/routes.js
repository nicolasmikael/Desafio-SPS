const { Router } = require("express");
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const { authenticateToken, requireAdmin } = require("./middleware/auth");
const {
  validateLogin,
  validateUserCreate,
  validateUserUpdate,
  handleValidationErrors,
} = require("./utils/validators");

const routes = Router();

// Health check
routes.get("/", (req, res) => {
  res.status(200).json({ message: "SPS User Management API is running!" });
});

// Authentication routes
routes.post(
  "/auth/login",
  validateLogin,
  handleValidationErrors,
  authController.login
);

routes.get("/auth/profile", authenticateToken, authController.getProfile);

// User routes (all protected)
routes.post(
  "/users",
  authenticateToken,
  requireAdmin,
  validateUserCreate,
  handleValidationErrors,
  userController.createUser
);

routes.get("/users", authenticateToken, userController.getAllUsers);

routes.get("/users/:id", authenticateToken, userController.getUserById);

routes.put(
  "/users/:id",
  authenticateToken,
  requireAdmin,
  validateUserUpdate,
  handleValidationErrors,
  userController.updateUser
);

routes.delete(
  "/users/:id",
  authenticateToken,
  requireAdmin,
  userController.deleteUser
);

module.exports = routes;
