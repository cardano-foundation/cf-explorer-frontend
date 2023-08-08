/// <reference types="cypress" />
describe("block spec", () => {
    it("should navigate to the blocks page", () => {
      cy.visit("/");
      cy.get('[data-testid="menu-button-blockchain"]').click();
      cy.get('[data-testid="submenu-button-top_ada_holders"]').click();
      cy.get('tbody tr td').eq(2).click();
      cy.get('[data-testid="table-common"] table th').eq(0).contains("#");
      cy.get('[data-testid="table-common"] table th').eq(1).contains("Tx Hash");
      cy.get('[data-testid="table-common"] table th').eq(2).contains("Created At");
      cy.get('[data-testid="table-common"] table th').eq(3).contains("Block");
      cy.get('[data-testid="table-common"] table th').eq(4).contains("Fees");
      cy.get('[data-testid="table-common"] table th').eq(5).contains("ADA amount");
      cy.get('[data-testid="table-common"] table th').eq(6).contains("Token");
    });
  });