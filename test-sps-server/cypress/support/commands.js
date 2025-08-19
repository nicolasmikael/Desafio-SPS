// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// API Authentication
Cypress.Commands.add(
  "apiLogin",
  (email = "admin@admin.com", password = "admin123") => {
    return cy
      .request({
        method: "POST",
        url: `${Cypress.env("API_URL")}/api/auth/login`,
        body: {
          email,
          password,
        },
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        const token = response.body.token;
        Cypress.env("authToken", token);
        return token;
      });
  }
);

// API Request with authentication
Cypress.Commands.add("apiRequest", (method, url, body = null) => {
  const options = {
    method,
    url: `${Cypress.env("API_URL")}${url}`,
    headers: {
      Authorization: `Bearer ${Cypress.env("authToken")}`,
    },
    failOnStatusCode: false,
  };

  if (body) {
    options.body = body;
  }

  return cy.request(options);
});

// Create user via API
Cypress.Commands.add("apiCreateUser", (userData) => {
  const defaultUserData = {
    name: "Test User",
    email: "testuser@example.com",
    type: "standard",
    password: "password123",
  };

  const user = { ...defaultUserData, ...userData };

  return cy.apiRequest("POST", "/api/users", user);
});

// Get all users via API
Cypress.Commands.add("apiGetUsers", () => {
  return cy.apiRequest("GET", "/api/users");
});

// Update user via API
Cypress.Commands.add("apiUpdateUser", (userId, userData) => {
  return cy.apiRequest("PUT", `/api/users/${userId}`, userData);
});

// Delete user via API
Cypress.Commands.add("apiDeleteUser", (userId) => {
  return cy.apiRequest("DELETE", `/api/users/${userId}`);
});

// Setup test data
Cypress.Commands.add("setupTestData", () => {
  cy.apiLogin().then(() => {
    // Clean all users except admin
    cy.apiGetUsers().then((response) => {
      const users = response.body.users;

      users.forEach((user) => {
        if (user.id !== 1 && user.email !== "admin@admin.com") {
          // Don't delete admin user (ID 1)
          cy.apiDeleteUser(user.id);
        }
      });
    });
  });
});

// Validate API response structure
Cypress.Commands.add("validateUserResponse", (user) => {
  expect(user).to.have.property("id");
  expect(user).to.have.property("name");
  expect(user).to.have.property("email");
  expect(user).to.have.property("type");
  expect(user).to.not.have.property("password");
});
