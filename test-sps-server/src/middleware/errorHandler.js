const jsonParsingErrorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON format" });
  }

  next(err);
};

const notFoundHandler = (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
};

const generalErrorHandler = (err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
};

module.exports = {
  jsonParsingErrorHandler,
  notFoundHandler,
  generalErrorHandler,
};
