const database = require("../database/inMemoryDb");

/**
 * Create a new user
 * @param {Object} createUserDto - User creation data
 * @param {string} createUserDto.email - User email
 * @param {string} createUserDto.name - User name
 * @param {string} createUserDto.password - User password
 * @param {string} [createUserDto.type="standard"] - User type
 * @returns {Promise<Object>} User response without password
 * @throws {Error} With status property for HTTP status codes
 */
async function createUser({ email, name, password, type }) {
  if (database.emailExists(email)) {
    const err = new Error("Email already exists");
    err.status = 400;
    throw err;
  }

  if (!email || !name || !password) {
    const err = new Error("Email, name, and password are required");
    err.status = 400;
    throw err;
  }

  if (password.length < 6) {
    const err = new Error("Password must be at least 6 characters long");
    err.status = 400;
    throw err;
  }

  if (name.length < 2 || name.length > 50) {
    const err = new Error("Name must be between 2 and 50 characters");
    err.status = 400;
    throw err;
  }

  if (type && type !== "admin" && type !== "standard") {
    const err = new Error("Type must be either 'admin' or 'standard'");
    err.status = 400;
    throw err;
  }

  const user = await database.createUser({
    email,
    name,
    password,
    type: type || "standard",
  });

  return user;
}

/**
 * Get all users
 * @returns {Array<Object>} Array of users without passwords
 */
function getAllUsers() {
  return database.getAllUsers();
}

/**
 * Get user by ID
 * @param {number} id - User ID
 * @returns {Object|null} User without password or null if not found
 */
function getUserById(id) {
  return database.getUserById(id);
}

/**
 * Update user
 * @param {number} id - User ID
 * @param {Object} updateUserDto - User update data
 * @param {string} [updateUserDto.email] - User email
 * @param {string} [updateUserDto.name] - User name
 * @param {string} [updateUserDto.password] - User password
 * @param {string} [updateUserDto.type] - User type
 * @returns {Promise<Object>} Updated user without password
 * @throws {Error} With status property for HTTP status codes
 */
async function updateUser(id, { email, name, password, type }) {
  const existingUser = database.getUserById(id);
  if (!existingUser) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }

  if (email && database.emailExists(email, parseInt(id))) {
    const err = new Error("Email already exists");
    err.status = 400;
    throw err;
  }

  if (name && (name.length < 2 || name.length > 50)) {
    const err = new Error("Name must be between 2 and 50 characters");
    err.status = 400;
    throw err;
  }

  if (password && password.length < 6) {
    const err = new Error("Password must be at least 6 characters long");
    err.status = 400;
    throw err;
  }

  if (type && type !== "admin" && type !== "standard") {
    const err = new Error("Type must be either 'admin' or 'standard'");
    err.status = 400;
    throw err;
  }

  const updatedUser = await database.updateUser(id, {
    email,
    name,
    password,
    type,
  });

  if (!updatedUser) {
    const err = new Error("Failed to update user");
    err.status = 500;
    throw err;
  }

  return updatedUser;
}

/**
 * Delete user
 * @param {Object} requestingUser - User making the request
 * @param {number} id - User ID to delete
 * @returns {Promise<boolean>} True if deleted, false if not found
 * @throws {Error} With status property for HTTP status codes
 */
async function deleteUser(requestingUser, id) {
  if (parseInt(id) === requestingUser.id) {
    const err = new Error("Cannot delete your own account");
    err.status = 400;
    throw err;
  }

  const deleted = await database.deleteUser(id);
  if (!deleted) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }

  return true;
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
