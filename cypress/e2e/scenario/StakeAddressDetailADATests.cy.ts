/// <reference types="cypress" />
describe("block spec", () => {
  it("should navigate to the blocks page", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-blockchain"]').click();
    cy.get('[data-testid="submenu-button-top_ada_holders"]').click();
    cy.get("button").contains("By Amount Staked").click();
    cy.get("table td").eq(2).click();
    cy.get(".MuiAccordionSummary-root").contains("Delegation History");
    cy.get(".MuiAccordionSummary-root").contains("Stake Address History");
    cy.get(".MuiAccordionSummary-root").contains("Withdrawal History");
    cy.get(".MuiAccordionSummary-root").contains("Instantaneous Rewards");
    cy.get(".MuiAccordionSummary-root").contains("Transactions");

    cy.get('[data-testid="table-common"] tr th').contains("Transaction Hash");
    cy.get('[data-testid="table-common"] tr th').contains("Created At");
    cy.get('[data-testid="table-common"] tr th').contains("Block");
    cy.get('[data-testid="table-common"] tr th').contains("Pool ID");
    cy.get('[data-testid="table-common"] tr th').contains("Pool Name");

    cy.get(".MuiAccordionSummary-root").contains("Stake Address History").click();
    cy.get('[data-testid="table-common"] tr th').contains("Transaction Hash");
    cy.get('[data-testid="table-common"] tr th').contains("Created At");
    cy.get('[data-testid="table-common"] tr th').contains("Block");
    cy.get('[data-testid="table-common"] tr th').contains("Action");

    cy.get(".MuiAccordionSummary-root").contains("Withdrawal History").click();
    cy.get('[data-testid="table-common"] th').contains("Transaction Hash");
    cy.get('[data-testid="table-common"] th').contains("Created At");
    cy.get('[data-testid="table-common"] th').contains("Block");
    cy.get('[data-testid="table-common"] th').contains("Amount");

    cy.get(".MuiAccordionSummary-root").contains("Instantaneous Rewards").click();
    cy.get('[data-testid="table-common"] th').contains("Transaction Hash");
    cy.get('[data-testid="table-common"] th').contains("Created At");
    cy.get('[data-testid="table-common"] th').contains("Block");
    cy.get('[data-testid="table-common"] th').contains("Rewards Paid");

    cy.get(".MuiAccordionSummary-root").contains("Transactions").click();
    cy.get('[data-testid="table-common"] th').contains("Transaction Hash");
    cy.get('[data-testid="table-common"] th').contains("Created At");
    cy.get('[data-testid="table-common"] th').contains("Block");
    cy.get('[data-testid="table-common"] th').contains("Fees");
    cy.get('[data-testid="table-common"] th').contains("ADA amount");
    cy.get('[data-testid="table-common"] th').contains("Token");
  });
});
