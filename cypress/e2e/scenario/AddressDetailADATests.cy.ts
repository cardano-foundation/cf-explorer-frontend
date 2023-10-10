/// <reference types="cypress" />
describe("block spec", () => {
  it("should navigate to the blocks page", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-blockchain"]').click();
    cy.get('[data-testid="submenu-button-top_ada_holders"]').click();
    cy.wait(500);
    cy.get("tbody tr td").eq(2).click();
    cy.get('[data-testid="table-common"] table th').eq(0).contains("Tx Hash", { matchCase: false });
    cy.get('[data-testid="table-common"] table th').eq(1).contains("Created At", { matchCase: false });
    cy.get('[data-testid="table-common"] table th').eq(2).contains("Block");
  });
});
