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

app.use(jsonParsingErrorHandler);

app.use("/api", routes);

setupSwagger(app);

app.use(notFoundHandler);

app.use(generalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server is running on http://localhost:3001");
});
