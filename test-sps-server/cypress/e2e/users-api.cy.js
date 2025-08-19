describe("Users API", () => {
  const baseUrl = Cypress.env("API_URL") || "http://localhost:3001";

  beforeEach(() => {
    cy.setupTestData();
  });

  describe("GET /api/users", () => {
    it("should get all users successfully", () => {
      cy.apiGetUsers().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("users");
        expect(response.body.users).to.be.an("array");

        // Validate user structure
        response.body.users.forEach((user) => {
          cy.validateUserResponse(user);
        });
      });
    });

    it("should require authentication", () => {
      cy.request({
        method: "GET",
        url: `${baseUrl}/api/users`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property(
          "error",
          "Access denied. No token provided."
        );
      });
    });
  });

  describe("POST /api/users", () => {
    it("should create user successfully", () => {
      const userData = {
        name: "Test User",
        email: "testuser@example.com",
        type: "standard",
        password: "password123",
      };

      cy.apiCreateUser(userData).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property(
          "message",
          "User created successfully"
        );
        expect(response.body).to.have.property("user");

        const user = response.body.user;
        cy.validateUserResponse(user);
        expect(user.name).to.eq(userData.name);
        expect(user.email).to.eq(userData.email);
        expect(user.type).to.eq(userData.type);
      });
    });

    it("should validate required fields", () => {
      cy.apiRequest("POST", "/api/users", {}).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("error");
      });
    });

    it("should validate email format", () => {
      cy.apiRequest("POST", "/api/users", {
        name: "Test User",
        email: "invalid-email",
        type: "standard",
        password: "password123",
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("error");
      });
    });

    it("should validate password length", () => {
      cy.apiRequest("POST", "/api/users", {
        name: "Test User",
        email: "test@example.com",
        type: "standard",
        password: "123",
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("error");
      });
    });

    it("should prevent duplicate emails", () => {
      const userData = {
        name: "Test User 1",
        email: "duplicate@example.com",
        type: "standard",
        password: "password123",
      };

      // Create first user
      cy.apiCreateUser(userData).then(() => {
        // Try to create second user with same email
        cy.apiRequest("POST", "/api/users", {
          ...userData,
          name: "Test User 2",
        }).then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body).to.have.property(
            "error",
            "Email already exists"
          );
        });
      });
    });

    it("should validate user type", () => {
      cy.apiRequest("POST", "/api/users", {
        name: "Test User",
        email: "test@example.com",
        type: "invalid-type",
        password: "password123",
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("error");
      });
    });
  });

  describe("GET /api/users/:id", () => {
    it("should get user by ID successfully", () => {
      // First create a user
      cy.apiCreateUser().then((createResponse) => {
        const userId = createResponse.body.user.id;

        cy.apiRequest("GET", `/api/users/${userId}`).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("user");

          const user = response.body.user;
          cy.validateUserResponse(user);
          expect(user.id).to.eq(userId);
        });
      });
    });

    it("should return 404 for non-existent user", () => {
      cy.apiRequest("GET", "/api/users/999999").then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.have.property("error", "User not found");
      });
    });

    it("should validate ID format", () => {
      cy.apiRequest("GET", "/api/users/invalid-id").then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });

  describe("PUT /api/users/:id", () => {
    it("should update user successfully", () => {
      // First create a user
      cy.apiCreateUser().then((createResponse) => {
        const userId = createResponse.body.user.id;
        const updateData = {
          name: "Updated User",
          email: "updated@example.com",
          type: "admin",
        };

        cy.apiUpdateUser(userId, updateData).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property(
            "message",
            "User updated successfully"
          );
          expect(response.body).to.have.property("user");

          const user = response.body.user;
          cy.validateUserResponse(user);
          expect(user.name).to.eq(updateData.name);
          expect(user.email).to.eq(updateData.email);
          expect(user.type).to.eq(updateData.type);
        });
      });
    });

    it("should update user password", () => {
      cy.apiCreateUser().then((createResponse) => {
        const userId = createResponse.body.user.id;
        const updateData = {
          name: "Test User",
          email: "testuser@example.com",
          type: "standard",
          password: "newpassword123",
        };

        cy.apiUpdateUser(userId, updateData).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property(
            "message",
            "User updated successfully"
          );
        });
      });
    });

    it("should return 404 for non-existent user", () => {
      cy.apiRequest("PUT", "/api/users/999999", {
        name: "Updated User",
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.have.property("error", "User not found");
      });
    });

    it("should prevent duplicate emails on update", () => {
      // Create two users
      cy.apiCreateUser({ email: "user1@example.com" }).then(() => {
        cy.apiCreateUser({ email: "user2@example.com" }).then(
          (createResponse) => {
            const userId = createResponse.body.user.id;

            // Try to update second user with first user's email
            cy.apiRequest("PUT", `/api/users/${userId}`, {
              email: "user1@example.com",
            }).then((response) => {
              expect(response.status).to.eq(400);
              expect(response.body).to.have.property(
                "error",
                "Email already exists"
              );
            });
          }
        );
      });
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("should delete user successfully", () => {
      cy.apiCreateUser().then((createResponse) => {
        const userId = createResponse.body.user.id;

        cy.apiDeleteUser(userId).then((response) => {
          expect(response.status).to.eq(204);
        });

        // Verify user is deleted
        cy.apiRequest("GET", `/api/users/${userId}`).then((response) => {
          expect(response.status).to.eq(404);
        });
      });
    });

    it("should return 404 for non-existent user", () => {
      cy.apiRequest("DELETE", "/api/users/999999").then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.have.property("error", "User not found");
      });
    });

    it("should prevent deleting own account", () => {
      // Get current user ID from login
      cy.apiLogin().then(() => {
        cy.apiRequest("GET", "/api/users").then((response) => {
          const currentUser = response.body.users.find(
            (u) => u.email === "admin@admin.com"
          );

          cy.apiRequest("DELETE", `/api/users/${currentUser.id}`).then(
            (response) => {
              expect(response.status).to.eq(400);
              expect(response.body).to.have.property(
                "error",
                "Cannot delete your own account"
              );
            }
          );
        });
      });
    });
  });

  describe("Authorization", () => {
    it("should allow admin to create users", () => {
      cy.apiLogin("admin@admin.com", "admin123").then(() => {
        cy.apiCreateUser().then((response) => {
          expect(response.status).to.eq(201);
        });
      });
    });

    it("should deny non-admin users from creating admin users", () => {
      // First create a standard user and login
      cy.apiCreateUser({
        email: "standard@example.com",
        type: "standard",
      }).then(() => {
        cy.apiLogin("standard@example.com", "password123").then(() => {
          cy.apiRequest("POST", "/api/users", {
            name: "Admin User",
            email: "newadmin@example.com",
            type: "admin",
            password: "password123",
          }).then((response) => {
            expect(response.status).to.eq(403);
            expect(response.body).to.have.property(
              "error",
              "Insufficient permissions"
            );
          });
        });
      });
    });
  });
});
