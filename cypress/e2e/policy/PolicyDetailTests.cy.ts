describe("Pool detail", () => {
  beforeEach(() => {
    cy.visit("/en/pool/pool1q80jjs53w0fx836n8g38gtdwr8ck5zre3da90peuxn84sj3cu0r");
  });

  it("should have header search box", () => {
    cy.get('[data-testid="header-search"]').should("be.visible");
    cy.get('[data-testid="all-filters-dropdown"] > .MuiSelect-select').contains("Pools");
  });

  it("should have enough columns of Epoch tab", () => {
    cy.get(".css-1dz0v3k > tr > :nth-child(1)").contains("Epoch");
    cy.get(".css-1dz0v3k > tr > :nth-child(2)").contains("Blocks");
    cy.get(".css-1dz0v3k > tr > :nth-child(3)").contains("Stake Amount");
    cy.get(".css-1dz0v3k > tr > :nth-child(4)").contains("Delegator Rewards");
    cy.get(".css-1dz0v3k > tr > :nth-child(5)").contains("Fees");
  });

  it.only("should have enough columns of Staking Delegators tab", () => {
    cy.get(".MuiAccordionSummary-content").eq(1).scrollIntoView().click();

    cy.get("table tr th").contains("No");
    cy.get("table tr th").contains("Delegator");
    cy.get("table tr th").contains("Total Value");
    cy.get("table tr th").contains("Staked Time");
    cy.get("table tr th").contains("Fees");
  });
});
