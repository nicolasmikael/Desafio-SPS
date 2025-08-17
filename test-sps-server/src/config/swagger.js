const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const setupSwagger = (app) => {
  // Swagger UI options
  const options = {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "SPS API Documentation",
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      tryItOutEnabled: true,
    },
  };

  // Public Swagger route - authentication handled within Swagger UI
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, options)
  );

  console.log(
    "Swagger documentation available at /api-docs (public access, JWT required for protected endpoints)"
  );
};

module.exports = setupSwagger;
