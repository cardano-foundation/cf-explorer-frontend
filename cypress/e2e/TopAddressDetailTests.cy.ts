describe("Top Address Detail Tests", () => {
  it("should navigate to the blocks page", () => {
    cy.visit("/");
    cy.get("[data-testid='menu-button-blockchain']").click();
    cy.get('[data-testid="submenu-button-top_ada_holders"]').click();
    cy.get('[data-testid="table-common"]').contains("Addresses");
  });
  it("verify element by address ADA Balance", () => {
    cy.visit("/addresses");
    cy.get('[data-testid="table-common"]').contains("Addresses");
    //cy.get(".css-1dz0v3k > tr > :nth-child(1)").contains("#");
    cy.get(".css-1dz0v3k > tr > :nth-child(2)").contains("Addresses");
    cy.get(".css-1dz0v3k > tr > :nth-child(3)").contains("Balance");
    cy.get(".css-1dz0v3k > tr > :nth-child(4)").contains("Transaction Count");
  });
  it.only("verify element by Amount Staked", () => {
    cy.visit("/addresses");
    cy.get('[id*="amount-staked"]').first().click();
    //cy.get(".css-1dz0v3k > tr > :nth-child(1)").contains("#");
    cy.get(".css-1dz0v3k > tr > :nth-child(1)").contains("Stake Address");
    cy.get(".css-1dz0v3k > tr > :nth-child(2)").contains("Pool");
    cy.get(".css-1dz0v3k > tr > :nth-child(3)").contains("Stake Amount");
  });
});
