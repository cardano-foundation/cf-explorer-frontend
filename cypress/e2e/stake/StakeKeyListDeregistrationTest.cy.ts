describe("Stake key de registration", () => {
  beforeEach(() => {
    cy.visit("/stake-address-de-registrations");
  });

  it("should have header search box", () => {
    cy.get('[data-testid="header-search"]').should("be.visible");
    cy.get('[data-testid="all-filters-dropdown"] > .MuiSelect-select').contains("Addresses");
  });

  it("should have enough columns", () => {
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Transaction Hash");
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Created At");
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Block");
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Absolute Slot");
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Stake Address", { matchCase: false });
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible");
  });
});
