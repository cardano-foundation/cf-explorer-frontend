describe("Deregistration screen", () => {
    it("User go to Dashboard and click Staking Lifecycle in left tab then verify the Staking Lifecycle Screen", () => {
      cy.visit("/");
      cy.get('[data-testid="menu-button-staking_lifecycle"]').click();
      cy.get('input[placeholder]').should('be.visible');
      cy.get('p[class]').contains('Search to explore the staking lifecycle events of a delegator or pool.').should('be.visible');
    });
  });