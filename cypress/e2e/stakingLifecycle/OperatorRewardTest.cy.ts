describe("Operator Reward screen", () => {
  it("User go to Staking Lifecycle and input the Stake Address, then verify the Pool update detail Screen", () => {
    const poolId = "pool1mrv06cwwdjnp6zz6y8wq7epav5eywka75r2k2xqy58ez6dge9cf"
    cy.visit("/");
    cy.get('[data-testid="menu-button-staking_lifecycle"]').click();
    cy.get('input[placeholder]').type(poolId).type('{enter}');
    cy.get('span').contains('Operator Rewards').click();
    cy.get('div[class]').contains('Cardano Blockchain').should('be.visible');
    cy.get('div[class]').contains('Operator Rewards').should('be.visible');
    cy.get('div[class]').contains('SPO').should('be.visible');

  });
});
