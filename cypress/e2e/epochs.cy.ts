/// <reference types="cypress" />

describe("template spec", () => {
  it("should navigate to the blocks page", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-blockchain"]').click();
    cy.get('[data-testid="submenu-button-epochs"]').click();
    cy.get('[data-testid="table-common"]').contains("Epoch");
  });

  it("should visit the blocks page", () => {
    cy.visit("/epochs");
    cy.get('[data-testid="table-common"]').contains("Epoch");
  });

  it("should have enough column", () => {
    cy.visit("/epochs");
    cy.get('.css-1dz0v3k > tr > :nth-child(1)').contains("Epoch Number");
    cy.get('.css-1dz0v3k > tr > :nth-child(2)').contains("Start Timestamp");
    cy.get('.css-1dz0v3k > tr > :nth-child(3)').contains("End Timestamp");
    cy.get('.css-1dz0v3k > tr > :nth-child(4)').contains("Blocks");
    cy.get('.css-1dz0v3k > tr > :nth-child(5)').contains("Unique Accounts");
    cy.get('.css-1dz0v3k > tr > :nth-child(6)').contains("Transaction Count");
    cy.get('.css-1dz0v3k > tr > :nth-child(7)').contains("Rewards Distributed");
    cy.get('.css-1dz0v3k > tr > :nth-child(8)').contains("Total Output");
  });


  it("should have epoch search bar", () => {
    cy.visit("/epochs");
    cy.get('[data-testid="header-search"]').should("be.visible");
  });
});
