/// <reference types="cypress" />

describe("template spec", () => {
  it("should navigate to the transactions page", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-blockchain"]').click();
    cy.get('[data-testid="submenu-button-transactions"]').click();
    cy.get('[data-testid="transactions-card"]').contains("Transactions");
  });

  it("should visit the blocks page", () => {
    cy.visit("/transactions");
    cy.get('[data-testid="transactions-card"]').contains("Transactions");
  });
});
