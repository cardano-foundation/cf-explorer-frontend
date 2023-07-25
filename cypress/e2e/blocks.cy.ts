/// <reference types="cypress" />

describe("template spec", () => {
  it("should navigate to the blocks page", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-blockchain"]').click();
    cy.get('[data-testid="submenu-button-blocks"]').click();
    cy.get('[data-testid="blocks-card"]').contains("Blocks");
  });

  it("should visit the blocks page", () => {
    cy.visit("/blocks");
    cy.get('[data-testid="blocks-card"]').contains("Blocks");
  });

  it("should show details of block 7588518", () => {
    cy.visit("/block/7588518");
    cy.get('[data-testid="block-details-total-output-in-ada"]').should("contain", "18,246,431.529342");
  });
  it("should have enough column", () => {
    cy.visit("/blocks");
    cy.get('.css-1dz0v3k > tr > :nth-child(1)').contains("Block No");
    cy.get('.css-1dz0v3k > tr > :nth-child(2)').contains("Block ID");
    cy.get('.css-1dz0v3k > tr > :nth-child(3)').contains("Epoch/Slot");
    cy.get('.css-1dz0v3k > tr > :nth-child(4)').contains("Created At");
    cy.get('.css-1dz0v3k > tr > :nth-child(5)').contains("Transactions");
    cy.get('.css-1dz0v3k > tr > :nth-child(6)').contains("Fees");
    cy.get('.css-1dz0v3k > tr > :nth-child(7)').contains("Output");
  });
  it.only("should have block search bar", () => {
    cy.visit("/blocks");
    cy.get('[data-testid="header-search"]').should("be.visible");
  });
});
