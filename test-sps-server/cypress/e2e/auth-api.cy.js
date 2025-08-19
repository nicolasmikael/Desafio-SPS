describe("Auth API", () => {
  const baseUrl = Cypress.env("API_URL") || "http://localhost:3001";

  describe("POST /api/auth/login", () => {
    it("should login successfully with valid credentials", () => {
      cy.request({
        method: "POST",
        url: `${baseUrl}/api/auth/login`,
        body: {
          email: "admin@admin.com",
          password: "admin123",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("token");
        expect(response.body).to.have.property("user");
        expect(response.body.user).to.have.property("id");
        expect(response.body.user).to.have.property("name");
        expect(response.body.user).to.have.property("email", "admin@admin.com");
        expect(response.body.user).to.have.property("type", "admin");
        expect(response.body.user).to.not.have.property("password");
      });
    });

    it("should return 400 for missing email", () => {
      cy.request({
        method: "POST",
        url: `${baseUrl}/api/auth/login`,
        body: {
          password: "admin123",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("error");
      });
    });

    it("should return 400 for missing password", () => {
      cy.request({
        method: "POST",
        url: `${baseUrl}/api/auth/login`,
        body: {
          email: "admin@admin.com",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("error");
      });
    });

    it("should return 401 for invalid email", () => {
      cy.request({
        method: "POST",
        url: `${baseUrl}/api/auth/login`,
        body: {
          email: "nonexistent@example.com",
          password: "admin123",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property("error", "Invalid credentials");
      });
    });

    it("should return 401 for invalid password", () => {
      cy.request({
        method: "POST",
        url: `${baseUrl}/api/auth/login`,
        body: {
          email: "admin@admin.com",
          password: "wrongpassword",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property("error", "Invalid credentials");
      });
    });

    it("should return 400 for invalid email format", () => {
      cy.request({
        method: "POST",
        url: `${baseUrl}/api/auth/login`,
        body: {
          email: "invalid-email",
          password: "admin123",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("error");
      });
    });

    it("should handle empty request body", () => {
      cy.request({
        method: "POST",
        url: `${baseUrl}/api/auth/login`,
        body: {},
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("error");
      });
    });
  });

  describe("Authentication Middleware", () => {
    it("should deny access to protected routes without token", () => {
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

    it("should deny access with invalid token", () => {
      cy.request({
        method: "GET",
        url: `${baseUrl}/api/users`,
        headers: {
          Authorization: "Bearer invalid-token",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property("error", "Invalid token.");
      });
    });

    it("should allow access with valid token", () => {
      // First login to get a valid token
      cy.apiLogin().then(() => {
        cy.request({
          method: "GET",
          url: `${baseUrl}/api/users`,
          headers: {
            Authorization: `Bearer ${Cypress.env("authToken")}`,
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("users");
        });
      });
    });
  });
});
