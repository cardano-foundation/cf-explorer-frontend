describe("Stake key detail", () => {
  beforeEach(() => {
    cy.visit("/stake-address/stake1uyc39hjuaaslxt007jwgrp4g742ffu2swzyx6x9038hlnnggc4elh/delegation");
  });

  it("should have header search box", () => {
    cy.get('[data-testid="header-search"]').should("be.visible");
    cy.get('[data-testid="all-filters-dropdown"] > .MuiSelect-select').contains("Addresses");
  });

  it("should have enough columns of Delegation History tab", () => {
    cy.get("table tr th").contains("Transaction Hash");
    cy.get("table tr th").contains("Created At");
    cy.get("table tr th").contains("Block");
    cy.get("table tr th").contains("Pool ID");
    cy.get("table tr th").contains("Pool Name");
  });

  it("should have enough columns of Staking Address tab", () => {
    cy.get(".MuiTabs-flexContainer button").eq(1).scrollIntoView().click();

    cy.get("table tr th").contains("Transaction Hash");
    cy.get("table tr th").contains("Created At");
    cy.get("table tr th").contains("Block");
    cy.get("table tr th").contains("Action");
  });

  it("should have enough columns of Withdrawal History tab", () => {
    cy.get(".MuiTabs-flexContainer button").eq(2).scrollIntoView().click();

    cy.get("table tr th").contains("Transaction Hash");
    cy.get("table tr th").contains("Created At");
    cy.get("table tr th").contains("Block");
    cy.get("table tr th").contains("Amount");
  });

  it("should have enough columns of Instantaneous Rewards tab", () => {
    cy.get(".MuiTabs-flexContainer button").eq(3).scrollIntoView().click();

    cy.get("table tr th").contains("Transaction Hash");
    cy.get("table tr th").contains("Created At");
    cy.get("table tr th").contains("Block");
    cy.get("table tr th").contains("Rewards Paid");
  });

  it("should have enough columns of Transactions tab", () => {
    cy.get(".MuiTabs-flexContainer button").eq(4).scrollIntoView().click();

    cy.get("table tr th").contains("Transaction Hash");
    cy.get("table tr th").contains("Created At");
    cy.get("table tr th").contains("Block");
    cy.get("table tr th").contains("Fees");
    cy.get("table tr th").contains("ADA amount");
    cy.get("table tr th").contains("Token");
  });
});
