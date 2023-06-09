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

  it("should show details of block 8237492", () => {
    cy.visit("/block/8237492");
    cy.get('[data-testid="block-details-total-output-in-ada"]').should("contain", "549.203328");
  });
});
