/// <reference types="cypress" />
describe("Stake address details e2e", () => {
  it("should navigate to the stake address detail", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-operational_certificates"]').click();
    cy.get('[data-testid="submenu-button-stake_delegation(s)"]').click();
    cy.get("tbody tr td a").first().click();
    cy.get('[class*="MuiGrid-root"]').first().should("be.visible");
    cy.get('[data-testid="tab-summary"]').should("be.visible");
    cy.get('[data-testid="tab-utxOs"]').should("be.visible");
    cy.get('[data-testid="tab-delegations"]').should("be.visible");
    cy.get('[data-test-id="CircularProgressbarWithChildren__children"]').should("be.visible");
  });
});
