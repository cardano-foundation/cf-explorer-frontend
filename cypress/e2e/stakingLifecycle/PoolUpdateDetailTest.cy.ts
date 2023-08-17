describe("Pool Update Detail screen", () => {
  it("User go to Staking Lifecycle and input the Stake Address, then verify the Pool update detail Screen", () => {
    it("fake test", () => {
      cy.visit("/");
      cy.get('[data-testid="menu-button-dashboard"]').contains("Dashboard");
    });
    /*
    const poolId = "pool1mrv06cwwdjnp6zz6y8wq7epav5eywka75r2k2xqy58ez6dge9cf"
    cy.visit("/");
    cy.get('[data-testid="menu-button-staking_lifecycle"]').click();
    cy.get('input[placeholder]').type(poolId).type('{enter}');
    cy.get('span').contains('Pool Updates').click();
    cy.get('[data-testid="overview-staking"]').should('be.visible');
    cy.get('[data-testid="overview-staking"]').eq(1).click();
    cy.get('div[class]').contains('SPO').should('be.visible');
    cy.get('div[class="MuiBox-root css-1apgwt7"]').should('be.visible');
    cy.get('div[class]').contains('Pool Certificate').should('be.visible');
    cy.get('div[class]').contains('Cardano Blockchain').should('be.visible');
    */
  });
});
