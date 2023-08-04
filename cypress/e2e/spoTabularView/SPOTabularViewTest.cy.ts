describe("SPO Tabular view", () => {
    it("User go to Staking Lifecycle and input the Pool ID, switch to tabular view then verify the Staking Lifecycle Screen", () => {
      const poolId = "pool1mrv06cwwdjnp6zz6y8wq7epav5eywka75r2k2xqy58ez6dge9cf"
      cy.visit("/");
      cy.get('[data-testid="menu-button-staking_lifecycle"]').click();
      cy.get('input[placeholder]').type(poolId).type('{enter}');
      cy.get('span').contains('Deregistration').click();
      cy.get('div>div>button[active="0"]').click();
      cy.get('[data-testid="table-common"]').should('be.visible');

    });
  });
  