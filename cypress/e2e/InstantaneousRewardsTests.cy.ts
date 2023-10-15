describe("Instantaneous rewards", () => {
  beforeEach(() => {
    cy.visit("/instantaneous-rewards");
  });

  it("should have header search box", () => {
    cy.get('[data-testid="header-search"]').should("be.visible");
    cy.get('[data-testid="all-filters-dropdown"] > .MuiSelect-select').contains("All Filters");
  });

  it("should have enough columns", () => {
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Transaction Hash");
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Created At");
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Block");
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Stake Address");
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Rewards Paid");
  });
});
