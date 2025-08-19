// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Set language to English for consistent testing
Cypress.Commands.add("setLanguageToEnglish", () => {
  cy.window().then((win) => {
    win.localStorage.setItem("language", "en");
  });
});

// Login command
Cypress.Commands.add(
  "login",
  (email = "admin@admin.com", password = "admin123") => {
    cy.setLanguageToEnglish();
    cy.visit("/signin");
    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="login-button"]').click();
    cy.url().should("include", "/");
    cy.window().its("localStorage.token").should("exist");
  }
);

// Logout command
Cypress.Commands.add("logout", () => {
  cy.get('[data-testid="logout-button"]').click();
  cy.url().should("include", "/signin");
  cy.window().its("localStorage.token").should("not.exist");
});

// Create user command
Cypress.Commands.add("createUser", (userData) => {
  const defaultUserData = {
    name: "Test User",
    email: "testuser@example.com",
    type: "standard",
    password: "password123",
  };

  const user = { ...defaultUserData, ...userData };

  cy.visit("/users/create");
  cy.get('[data-testid="name-input"]').type(user.name);
  cy.get('[data-testid="email-input"]').type(user.email);
  cy.get('[data-testid="type-select"]').select(user.type);
  cy.get('[data-testid="password-input"]').type(user.password);
  cy.get('[data-testid="submit-button"]').click();
});

// Navigate to users page
Cypress.Commands.add("navigateToUsers", () => {
  cy.visit("/users");
  cy.get('[data-testid="users-table"]').should("be.visible");
});

// Wait for API request
Cypress.Commands.add("waitForApi", (alias) => {
  cy.wait(alias).then((interception) => {
    expect(interception.response.statusCode).to.be.oneOf([200, 201, 204]);
  });
});

// Setup API intercepts
Cypress.Commands.add("setupApiIntercepts", () => {
  cy.intercept("GET", "/api/users", { fixture: "users.json" }).as("getUsers");
  cy.intercept("POST", "/api/users", {
    statusCode: 201,
    body: { message: "User created successfully" },
  }).as("createUser");
  cy.intercept("PUT", "/api/users/*", {
    statusCode: 200,
    body: { message: "User updated successfully" },
  }).as("updateUser");
  cy.intercept("DELETE", "/api/users/*", { statusCode: 204 }).as("deleteUser");
  cy.intercept("POST", "/api/auth/login", { fixture: "auth.json" }).as("login");
});
