/* global cy */
describe("Users Management", () => {
  beforeEach(() => {
    // Setup API intercepts before each test
    cy.intercept("GET", "**/api/users", { fixture: "users.json" }).as(
      "getUsers"
    );
    cy.intercept("POST", "**/api/auth/login", { fixture: "auth.json" }).as(
      "login"
    );
    // Intercept profile request to prevent token validation failure
    cy.intercept("GET", "**/api/auth/profile", {
      statusCode: 200,
      body: {
        user: {
          id: 1,
          name: "Admin User",
          email: "admin@admin.com",
          type: "admin",
        },
      },
    }).as("getProfile");
    cy.login();
  });

  describe("Users List", () => {
    beforeEach(() => {
      cy.visit("/users");
      cy.wait("@getUsers");
    });

    it("should display users table", () => {
      cy.get('[data-testid="users-table"]').should("be.visible");
      cy.contains("Administrator").should("be.visible");
    });

    it("should have create user button", () => {
      cy.get('[data-testid="create-user-button"]').should("be.visible");
      cy.get('[data-testid="create-user-button"]').should(
        "contain",
        "Create New User"
      );
    });

    it("should navigate to create user page", () => {
      cy.get('[data-testid="create-user-button"]').click();
      cy.url().should("include", "/users/create");
    });

    it("should have edit buttons for each user", () => {
      cy.get('[data-testid="edit-user-1"]').should("be.visible");
      cy.get('[data-testid="edit-user-2"]').should("be.visible");
    });

    it("should have delete buttons for each user (except current user)", () => {
      cy.get('[data-testid="delete-user-2"]').should("be.visible");
      cy.get('[data-testid="delete-user-3"]').should("be.visible");
      // Admin user (id 1) should not have delete button
      cy.get('[data-testid="delete-user-1"]').should("not.exist");
    });

    it("should filter users by search", () => {
      cy.get('[data-testid="search-input"]').type("John");
      cy.contains("John Doe").should("be.visible");
      cy.contains("Jane Smith").should("not.exist");
    });

    it("should filter users by type", () => {
      cy.get('[data-testid="type-filter"]').select("admin");
      cy.contains("Admin User").should("be.visible");
      cy.contains("Jane Smith").should("be.visible");
      cy.contains("John Doe").should("not.exist");
    });
  });

  describe("Create User", () => {
    beforeEach(() => {
      cy.visit("/users/create");
    });

    it("should display create user form", () => {
      cy.contains("Create New User").should("be.visible");
      cy.get('[data-testid="name-input"]').should("be.visible");
      cy.get('[data-testid="email-input"]').should("be.visible");
      cy.get('[data-testid="type-select"]').should("be.visible");
      cy.get('[data-testid="password-input"]').should("be.visible");
    });

    it("should validate required fields", () => {
      cy.get('[data-testid="submit-button"]').click();

      cy.contains("Name is required").should("be.visible");
      cy.contains("Email is required").should("be.visible");
      cy.contains("Password is required").should("be.visible");
    });

    it("should validate email format", () => {
      cy.get('[data-testid="email-input"]').type("invalid-email");
      cy.get('[data-testid="submit-button"]').click();

      cy.contains("Invalid email format").should("be.visible");
    });

    it("should create user successfully", () => {
      cy.intercept("POST", "**/api/users", {
        statusCode: 201,
        body: {
          message: "User created successfully",
          user: { id: 5, name: "New User" },
        },
      }).as("createUser");

      cy.get('[data-testid="name-input"]').type("New User");
      cy.get('[data-testid="email-input"]').type("newuser@example.com");
      cy.get('[data-testid="type-select"]').select("standard");
      cy.get('[data-testid="password-input"]').type("password123");
      cy.get('[data-testid="submit-button"]').click();

      cy.wait("@createUser");
      cy.url().should("include", "/users");
      cy.contains("User created successfully").should("be.visible");
    });

    it("should handle creation error", () => {
      cy.intercept("POST", "**/api/users", {
        statusCode: 400,
        body: { error: "Email already exists" },
      }).as("createUserError");

      cy.get('[data-testid="name-input"]').type("New User");
      cy.get('[data-testid="email-input"]').type("existing@example.com");
      cy.get('[data-testid="type-select"]').select("standard");
      cy.get('[data-testid="password-input"]').type("password123");
      cy.get('[data-testid="submit-button"]').click();

      cy.wait("@createUserError");
      cy.contains("Email already exists").should("be.visible");
      cy.url().should("include", "/users/create");
    });

    it("should cancel creation and return to users list", () => {
      cy.get('[data-testid="cancel-button"]').click();
      cy.url().should("include", "/users");
    });
  });

  describe("Edit User", () => {
    beforeEach(() => {
      cy.intercept("GET", "**/api/users/2", {
        body: {
          user: {
            id: 2,
            name: "John Doe",
            email: "john.doe@example.com",
            type: "standard",
          },
        },
      }).as("getUser");

      cy.visit("/users/2/edit");
      cy.wait("@getUser");
    });

    it("should display edit user form with pre-filled data", () => {
      cy.contains("Edit User").should("be.visible");
      cy.get('[data-testid="name-input"]').should("have.value", "John Doe");
      cy.get('[data-testid="email-input"]').should(
        "have.value",
        "john.doe@example.com"
      );
      cy.get('[data-testid="type-select"]').should("have.value", "standard");
    });

    it("should update user successfully", () => {
      cy.intercept("PUT", "**/api/users/2", {
        statusCode: 200,
        body: { message: "User updated successfully" },
      }).as("updateUser");

      cy.get('[data-testid="name-input"]').clear().type("John Smith");
      cy.get('[data-testid="submit-button"]').click();

      cy.wait("@updateUser");
      cy.url().should("include", "/users");
      cy.contains("User updated successfully").should("be.visible");
    });

    it("should handle update error", () => {
      cy.intercept("PUT", "**/api/users/2", {
        statusCode: 400,
        body: { error: "Email already exists" },
      }).as("updateUserError");

      cy.get('[data-testid="email-input"]')
        .clear()
        .type("existing@example.com");
      cy.get('[data-testid="submit-button"]').click();

      cy.wait("@updateUserError");
      cy.contains("Email already exists").should("be.visible");
    });
  });

  describe("Delete User", () => {
    beforeEach(() => {
      cy.intercept("GET", "**/api/users", { fixture: "users.json" }).as(
        "getUsers"
      );
      cy.visit("/users");
      cy.wait("@getUsers");
    });

    it("should delete user successfully", () => {
      cy.intercept("DELETE", "**/api/users/2", { statusCode: 204 }).as(
        "deleteUser"
      );
      cy.intercept("GET", "**/api/users", {
        body: {
          users: [
            {
              id: 1,
              name: "Admin User",
              email: "admin@admin.com",
              type: "admin",
            },
            {
              id: 3,
              name: "Jane Smith",
              email: "jane.smith@example.com",
              type: "admin",
            },
          ],
        },
      }).as("getUsersAfterDelete");

      cy.window().then((win) => {
        cy.stub(win, "confirm").returns(true);
      });
      cy.get('[data-testid="delete-user-2"]').click();

      cy.wait("@deleteUser");
      cy.wait("@getUsersAfterDelete");

      cy.contains("User deleted successfully").should("be.visible");
      cy.contains("John Doe").should("not.exist");
    });

    it("should cancel deletion", () => {
      cy.window().then((win) => {
        cy.stub(win, "confirm").returns(false);
      });
      cy.get('[data-testid="delete-user-2"]').click();

      cy.contains("John Doe").should("be.visible");
    });
  });

  describe("Language Switching", () => {
    it("should switch language and update interface", () => {
      cy.visit("/users");

      // Switch to Portuguese
      cy.get('[data-testid="language-switch"]').select("pt");

      cy.contains("Gerenciamento de Usuários").should("be.visible");
      cy.contains("Criar Novo Usuário").should("be.visible");

      // Switch back to English
      cy.get('[data-testid="language-switch"]').select("en");

      cy.contains("Users Management").should("be.visible");
      cy.contains("Create New User").should("be.visible");
    });
  });
});
