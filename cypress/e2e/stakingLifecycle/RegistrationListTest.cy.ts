describe("Registration List screen", () => {
  it("User go to Staking Lifecycle and input the Pool ID, then verify the Registration List Screen", () => {
    const poolId = "pool1mrv06cwwdjnp6zz6y8wq7epav5eywka75r2k2xqy58ez6dge9cf"
    cy.visit("/");
    cy.get('[data-testid="menu-button-staking_lifecycle"]').click();
    cy.get('input[placeholder]').type(poolId).type('{enter}');
    cy.get('span').contains('Deregistration').click();
    cy.get('[data-testid="overview-staking"]').should('be.visible');
    cy.get('[data-testid="overview-staking-hash"]').should('be.visible');
    cy.get('[data-testid="overview-staking-amount"]').should('be.visible');
    cy.get('[data-testid="overview-staking-time"]').should('be.visible');
  });
});
