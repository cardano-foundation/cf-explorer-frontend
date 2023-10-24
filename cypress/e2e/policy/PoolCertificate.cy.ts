describe("Pool Certificate", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-operational_certificates"]').click();
    cy.get('[data-testid="submenu-button-pool_certificate"]').click();
    cy.get("h2").contains("Pool Certificate");
  });

  it("should have header search box", () => {
    cy.get('[data-testid="header-search"]').should("be.visible");
    cy.get('[data-testid="all-filters-dropdown"] > .MuiSelect-select').contains("Pools");
  });

  it("should have enough columns", () => {
    cy.get(".css-1dz0v3k > tr > :nth-child(1)")

      .should("be.visible")
      .contains("Transaction Hash", { matchCase: false });
    cy.get(".css-1dz0v3k > tr > :nth-child(2)")

      .should("be.visible")
      .contains("Created At", { matchCase: false });
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Block");
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Pool");
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Pledge");
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Fixed Cost", { matchCase: false });
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Margin");
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Stake Address", { matchCase: false });
  });
});
