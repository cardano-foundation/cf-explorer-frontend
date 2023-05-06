/// <reference types="cypress" />

describe("template spec", () => {
  it("should navigate to the blocks page", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="toggle-sidebar-icon"]').click();
    cy.get('[data-testid="menu-button-blockchain"]').click();
  });

  it("should visit the blocks page", () => {
    cy.visit("http://localhost:3000/blocks");
    cy.get('[data-testid="blocks-card"]').contains("Blocks");
  });
});
