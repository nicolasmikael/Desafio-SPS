import React from "react";
import { BrowserRouter } from "react-router-dom";
import UserForm from "./UserForm";
import { I18nProvider } from "../contexts/I18nContext";

// Mock translations
const mockTranslations = {
  "form.editUser": "Edit User",
  "users.createNew": "Create New User",
  "form.name": "Name",
  "form.nameRequired": "Name is required",
  "form.email": "Email",
  "form.emailRequired": "Email is required",
  "form.userType": "User Type",
  "form.password": "Password",
  "form.passwordRequired": "Password is required",
  "userType.standard": "Standard",
  "userType.admin": "Admin",
  "action.cancel": "Cancel",
  "form.createUser": "Create User",
  "form.updateUser": "Update User",
};

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <I18nProvider value={{ t: (key) => mockTranslations[key] || key }}>
      {children}
    </I18nProvider>
  </BrowserRouter>
);

describe("UserForm Component", () => {
  it("should render create form correctly", () => {
    cy.mount(
      <TestWrapper>
        <UserForm isEdit={false} />
      </TestWrapper>
    );

    cy.contains("Create New User").should("be.visible");
    cy.get('[data-testid="name-input"]').should("be.visible");
    cy.get('[data-testid="email-input"]').should("be.visible");
    cy.get('[data-testid="type-select"]').should("be.visible");
    cy.get('[data-testid="password-input"]').should("be.visible");
    cy.get('[data-testid="submit-button"]').should("contain", "Create User");
  });

  it("should render edit form with user data", () => {
    const user = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      type: "admin",
    };

    cy.mount(
      <TestWrapper>
        <UserForm user={user} isEdit={true} />
      </TestWrapper>
    );

    cy.contains("Edit User").should("be.visible");
    cy.get('[data-testid="name-input"]').should("have.value", "John Doe");
    cy.get('[data-testid="email-input"]').should(
      "have.value",
      "john@example.com"
    );
    cy.get('[data-testid="type-select"]').should("have.value", "admin");
    cy.get('[data-testid="submit-button"]').should("contain", "Update User");
  });

  it("should validate required fields", () => {
    cy.mount(
      <TestWrapper>
        <UserForm isEdit={false} />
      </TestWrapper>
    );

    cy.get('[data-testid="submit-button"]').click();

    cy.contains("Name is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
  });

  it("should fill form and submit", () => {
    cy.mount(
      <TestWrapper>
        <UserForm isEdit={false} />
      </TestWrapper>
    );

    cy.get('[data-testid="name-input"]').type("Test User");
    cy.get('[data-testid="email-input"]').type("test@example.com");
    cy.get('[data-testid="type-select"]').select("standard");
    cy.get('[data-testid="password-input"]').type("password123");

    // Check that form is filled correctly
    cy.get('[data-testid="name-input"]').should("have.value", "Test User");
    cy.get('[data-testid="email-input"]').should(
      "have.value",
      "test@example.com"
    );
    cy.get('[data-testid="type-select"]').should("have.value", "standard");
    cy.get('[data-testid="password-input"]').should(
      "have.value",
      "password123"
    );
  });
});
