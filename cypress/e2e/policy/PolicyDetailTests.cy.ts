describe("Pool detail", () => {
  beforeEach(() => {
    cy.visit("/pool/pool1q80jjs53w0fx836n8g38gtdwr8ck5zre3da90peuxn84sj3cu0r");
  });

  it("should have header search box", () => {
    cy.get('[data-testid="header-search"]').should("be.visible");
    cy.get('[data-testid="all-filters-dropdown"] > .MuiSelect-select').contains("Pools");
  });

  it("should have enough columns of Epoch tab", () => {
    cy.get(".css-1dz0v3k > tr > :nth-child(1)").scrollIntoView().should("be.visible").contains("Epoch");
    cy.get(".css-1dz0v3k > tr > :nth-child(2)").scrollIntoView().should("be.visible").contains("Blocks");
    cy.get(".css-1dz0v3k > tr > :nth-child(3)").scrollIntoView().should("be.visible").contains("Stake Amount (A)");
    cy.get(".css-1dz0v3k > tr > :nth-child(4)").scrollIntoView().should("be.visible").contains("Delegator Rewards (A)");
    cy.get(".css-1dz0v3k > tr > :nth-child(5)").scrollIntoView().should("be.visible").contains("Fees (A)");
  });

  it("should have enough columns of Staking Delegators tab", () => {
    cy.get(".MuiTabs-flexContainer button").eq(1).scrollIntoView().click();

    cy.get(".css-1dz0v3k > tr > :nth-child(1)").scrollIntoView().should("be.visible").contains("No");
    cy.get(".css-1dz0v3k > tr > :nth-child(2)").scrollIntoView().should("be.visible").contains("Delegator");
    cy.get(".css-1dz0v3k > tr > :nth-child(3)").scrollIntoView().should("be.visible").contains("Total Value (A)");
    cy.get(".css-1dz0v3k > tr > :nth-child(4)").scrollIntoView().should("be.visible").contains("Staked Time");
    cy.get(".css-1dz0v3k > tr > :nth-child(5)").scrollIntoView().should("be.visible").contains("Fees (A)");
  });
});
