/// <reference types="cypress" />

describe("template spec", () => {
  it("should navigate to the transactions page", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="toggle-sidebar-icon"]').click();
    cy.get('[data-testid="menu-button-blockchain"]').click();
    cy.get('[data-testid="submenu-button-transactions"]').click();
    cy.get('[data-testid="transactions-card"]').contains("Transactions");
  });

  it("should visit the blocks page", () => {
    cy.visit("http://localhost:3000/transactions");
    cy.get('[data-testid="transactions-card"]').contains("Transactions");
  });
});
