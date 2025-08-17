require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const setupSwagger = require("./config/swagger");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Setup Swagger documentation (protected with JWT)
setupSwagger(app);

app.listen(process.env.PORT, () => {
  console.log("Server is running on http://localhost:3001");
});
