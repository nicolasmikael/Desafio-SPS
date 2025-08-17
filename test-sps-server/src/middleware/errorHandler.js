// JSON parsing error middleware
const jsonParsingErrorHandler = (err, req, res, next) => {
  // Check if this is a JSON parsing error from express.json()
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON format" });
  }

  // Pass other errors to the next error handler
  next(err);
};

// 404 handler for non-existent API routes
const notFoundHandler = (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
};

// General error handler (fallback)
const generalErrorHandler = (err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
};

module.exports = {
  jsonParsingErrorHandler,
  notFoundHandler,
  generalErrorHandler,
};
