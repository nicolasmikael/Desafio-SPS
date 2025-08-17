const jwt = require("jsonwebtoken");

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      type: user.type,
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
};

const requireAdmin = (req, res, next) => {
  if (req.user.type !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

module.exports = {
  authenticateToken,
  generateToken,
  requireAdmin,
  JWT_SECRET,
};
