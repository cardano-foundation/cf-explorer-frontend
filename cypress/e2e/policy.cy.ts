/// <reference types="cypress" />

describe("policy spec", () => {
  it("should check that the balance is 1 for assets with quantity 1", () => {
    cy.visit("/policy/d5e6bf0500378d4f0da4e8dde6becec7621cd8cbf5cbb9b87013d4cc?page=1&size=50");
    cy.contains("Policy Asset Holders").click();
    cy.get('[data-testid="table-common"]').contains("Balance").should("be.visible");
  });
});
