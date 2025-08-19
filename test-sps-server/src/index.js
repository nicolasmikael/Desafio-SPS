require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const setupSwagger = require("./config/swagger");
const {
  jsonParsingErrorHandler,
  notFoundHandler,
  generalErrorHandler,
} = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// JSON parsing error handler - must come after express.json()
app.use(jsonParsingErrorHandler);

app.use("/api", routes);

// Setup Swagger documentation (protected with JWT)
setupSwagger(app);

// 404 handler for non-existent routes - must come after all routes
app.use(notFoundHandler);

// General error handler - must be last
app.use(generalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server is running on http://localhost:3001");
});
