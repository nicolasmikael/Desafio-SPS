const database = require("../database/inMemoryDb");
const { generateToken } = require("../middleware/auth");

/**
 * Authenticate user and generate token
 * @param {Object} authLoginDto - Login credentials
 * @param {string} authLoginDto.email - User email
 * @param {string} authLoginDto.password - User password
 * @returns {Promise<Object>} Object containing token and user without password
 * @throws {Error} With status property for HTTP status codes
 */
async function login({ email, password }) {
  if (!email || !password || !email.trim() || !password.trim()) {
    const err = new Error("Email and password are required");
    err.status = 400;
    throw err;
  }

  const user = database.getUserByEmail(email);
  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const isValidPassword = await database.validatePassword(
    password,
    user.password
  );
  if (!isValidPassword) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const token = generateToken(user);

  const userWithoutPassword = database.getUserWithoutPassword(user);

  return {
    token,
    user: userWithoutPassword,
  };
}

/**
 * Get user profile
 * @param {number} userId - User ID
 * @returns {Object|null} User without password or null if not found
 */
function getProfile(userId) {
  return database.getUserById(userId);
}

module.exports = {
  login,
  getProfile,
};
