describe("Stake key detail", () => {
  beforeEach(() => {
    cy.visit("/stake-address/stake1uyc39hjuaaslxt007jwgrp4g742ffu2swzyx6x9038hlnnggc4elh/delegation");
  });

  it("should have header search box", () => {
    cy.get('[data-testid="header-search"]').should("be.visible");
    cy.get('[data-testid="all-filters-dropdown"] > .MuiSelect-select').contains("Addresses");
  });

  it("should have enough columns of Delegation History tab", () => {
    cy.get(".css-1dz0v3k > tr > :nth-child(1)").scrollIntoView().should("be.visible").contains("Tx Hash");
    cy.get(".css-1dz0v3k > tr > :nth-child(2)").scrollIntoView().should("be.visible").contains("Created At");
    cy.get(".css-1dz0v3k > tr > :nth-child(3)").scrollIntoView().should("be.visible").contains("Block");
    cy.get(".css-1dz0v3k > tr > :nth-child(4)").scrollIntoView().should("be.visible").contains("Pool ID");
    cy.get(".css-1dz0v3k > tr > :nth-child(5)").scrollIntoView().should("be.visible").contains("Pool Name");
  });

  it("should have enough columns of Staking Address tab", () => {
    cy.get(".MuiTabs-flexContainer button").eq(1).scrollIntoView().click();

    cy.get(".css-1dz0v3k > tr > :nth-child(1)").scrollIntoView().should("be.visible").contains("Tx Hash");
    cy.get(".css-1dz0v3k > tr > :nth-child(2)").scrollIntoView().should("be.visible").contains("Created At");
    cy.get(".css-1dz0v3k > tr > :nth-child(3)").scrollIntoView().should("be.visible").contains("Block");
    cy.get(".css-1dz0v3k > tr > :nth-child(4)").scrollIntoView().should("be.visible").contains("Action");
  });

  it("should have enough columns of Withdrawal History tab", () => {
    cy.get(".MuiTabs-flexContainer button").eq(2).scrollIntoView().click();

    cy.get(".css-1dz0v3k > tr > :nth-child(1)").scrollIntoView().should("be.visible").contains("Tx Hash");
    cy.get(".css-1dz0v3k > tr > :nth-child(2)").scrollIntoView().should("be.visible").contains("Created At");
    cy.get(".css-1dz0v3k > tr > :nth-child(3)").scrollIntoView().should("be.visible").contains("Block");
    cy.get(".css-1dz0v3k > tr > :nth-child(4)").scrollIntoView().should("be.visible").contains("Amount");
  });

  it("should have enough columns of Instantaneous Rewards tab", () => {
    cy.get(".MuiTabs-flexContainer button").eq(3).scrollIntoView().click();

    cy.get(".css-1dz0v3k > tr > :nth-child(1)").scrollIntoView().should("be.visible").contains("Tx Hash");
    cy.get(".css-1dz0v3k > tr > :nth-child(2)").scrollIntoView().should("be.visible").contains("Created At");
    cy.get(".css-1dz0v3k > tr > :nth-child(3)").scrollIntoView().should("be.visible").contains("Block");
    cy.get(".css-1dz0v3k > tr > :nth-child(4)").scrollIntoView().should("be.visible").contains("Rewards Paid");
  });

  it("should have enough columns of Transactions tab", () => {
    cy.get(".MuiTabs-flexContainer button").eq(4).scrollIntoView().click();

    //cy.get(".css-1dz0v3k > tr > :nth-child(1)").scrollIntoView().should("be.visible").contains("#");
    cy.get(".css-1dz0v3k > tr > :nth-child(1)").scrollIntoView().should("be.visible").contains("Tx Hash");
    cy.get(".css-1dz0v3k > tr > :nth-child(2)").scrollIntoView().should("be.visible").contains("Created At");
    cy.get(".css-1dz0v3k > tr > :nth-child(3)").scrollIntoView().should("be.visible").contains("Block");
    cy.get(".css-1dz0v3k > tr > :nth-child(4)").scrollIntoView().should("be.visible").contains("Fees");
    cy.get(".css-1dz0v3k > tr > :nth-child(5)").scrollIntoView().should("be.visible").contains("ADA amount");
    cy.get(".css-1dz0v3k > tr > :nth-child(6)").scrollIntoView().should("be.visible").contains("Token");
  });
});
