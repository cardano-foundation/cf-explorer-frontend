describe("Registration List screen", () => {
    it("User go to Staking Lifecycle and input the Stake Address, switch to tabular view then verify the Stake key general information ", () => {
      const stakeAddr = "stake1u98ujxfgzdm8yh6qsaar54nmmr50484t4ytphxjex3zxh7g4tuwna"
      cy.visit("/");
      cy.get('[data-testid="menu-button-staking_lifecycle"]').click();
      cy.get('input[placeholder]').type(stakeAddr).type('{enter}');
      cy.get('span').contains('Deregistration').click();
      cy.get('div>div>button[active="0"]').click();
      cy.get('[data-testid="table-common"]').should('be.visible');
      cy.get('div').contains('Payment Wallet').should('be.visible');
      cy.get('button').contains('ADA Transfers').should('be.visible');
      cy.get('div').contains('Reward Account').should('be.visible');
      cy.get('div').contains('Rewards Withdrawn').should('be.visible');
      cy.get('div').contains('Delegating To').should('be.visible');
    });
  });
  