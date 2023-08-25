/// <reference types="cypress" />
describe("block spec", () => {
  it("should navigate to the blocks page", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-blockchain"]').click();
    cy.get('[data-testid="submenu-button-top_ada_holders"]').click();
    cy.get("tbody tr td").eq(2).click();
    cy.get('[data-testid="table-common"] table th').eq(0).contains("Addresses");
    cy.get('[data-testid="table-common"] table th').eq(1).contains("Balance");
    cy.get('[data-testid="table-common"] table th').eq(2).contains("Transaction Count");

    cy.get("[id*='T-amount-staked']").click();
    cy.get('[data-testid="table-common"] table th').eq(0).contains("Stake Address");
    cy.get('[data-testid="table-common"] table th').eq(1).contains("Pool");
    cy.get('[data-testid="table-common"] table th').eq(2).contains("Stake amount");
  });
});
