/// <reference types="cypress" />
describe("block spec", () => {
  it("should navigate to the blocks page", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-blockchain"]').click();
    cy.get('[data-testid="submenu-button-top_ada_holders"]').click();
    cy.get("button").contains("By Amount Staked").click();
    cy.get("table td").eq(2).click();
    cy.get("button").contains("Delegation History").should("be.visible");
    cy.get("button").contains("Stake Address History").should("be.visible");
    cy.get("button").contains("Withdrawal History").should("be.visible");
    cy.get("button").contains("Instantaneous Rewards").should("be.visible");
    cy.get("button").contains("Transactions").should("be.visible");

    cy.get('[data-testid="table-common"] th').eq(0).contains("Transaction Hash");
    cy.get('[data-testid="table-common"] th').eq(1).contains("Created At");
    cy.get('[data-testid="table-common"] th').eq(2).contains("Block");
    cy.get('[data-testid="table-common"] th').eq(3).contains("Pool ID");
    cy.get('[data-testid="table-common"] th').eq(4).contains("Pool Name");

    cy.get("button").contains("Stake Address History").click();
    cy.get('[data-testid="table-common"] th').eq(0).contains("Transaction Hash");
    cy.get('[data-testid="table-common"] th').eq(1).contains("Created At");
    cy.get('[data-testid="table-common"] th').eq(2).contains("Block");
    cy.get('[data-testid="table-common"] th').eq(3).contains("Action");

    cy.get("button").contains("Withdrawal History").click();
    cy.get('[data-testid="table-common"] th').eq(0).contains("Transaction Hash");
    cy.get('[data-testid="table-common"] th').eq(1).contains("Created At");
    cy.get('[data-testid="table-common"] th').eq(2).contains("Block");
    cy.get('[data-testid="table-common"] th').eq(3).contains("Amount");

    cy.get("button").contains("Instantaneous Rewards").click();
    cy.get('[data-testid="table-common"] th').eq(0).contains("Transaction Hash");
    cy.get('[data-testid="table-common"] th').eq(1).contains("Created At");
    cy.get('[data-testid="table-common"] th').eq(2).contains("Block");
    cy.get('[data-testid="table-common"] th').eq(3).contains("Rewards Paid");

    cy.get("button").contains("Transactions").click();
    cy.get('[data-testid="table-common"] th').eq(0).contains("Transaction Hash");
    cy.get('[data-testid="table-common"] th').eq(1).contains("Created At");
    cy.get('[data-testid="table-common"] th').eq(2).contains("Block");
    cy.get('[data-testid="table-common"] th').eq(3).contains("Fees");
    cy.get('[data-testid="table-common"] th').eq(4).contains("ADA amount");
    cy.get('[data-testid="table-common"] th').eq(5).contains("Token");
  });
});
