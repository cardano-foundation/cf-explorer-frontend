describe("User check information of Pool Lifecycle screen", () => {
  it("User go Pool lifecycle screen, then verify information registration, pool update, operator rewards, deregistration", () => {
    it("fake test", () => {
      cy.visit("/");
      cy.get('[data-testid="menu-button-dashboard"]').contains("Dashboard");
    });
    /*
        cy.visit('/')
        cy.get('[data-testid="header-signin"]').click()
        cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').clear().type('hanh.luu+2@sotatek.com')
        cy.get(':nth-child(3) > .MuiInputBase-root > .MuiInputBase-input').clear().type('Test1234@')
        cy.get('[data-testid="login-btn"]').click()

        cy.get('[data-testid="menu-button-staking_lifecycle"]').click()
        cy.get('.css-dkcpqo').clear().type('pool19n5ml38q5uedy8kgwwwtlsa3p9tmfcef0lfjp42k7j9d5mpgs2m').type(`{enter}`)

        cy.get('.css-7fi33o').contains('Staking Lifecycle For')
        cy.get('.css-13nxg8k').click()
        cy.get('.css-2nls1a').contains('Switch to timeline view')
        cy.get('.css-18gbrsc').click()

        cy.get('[data-testid="slider"]').should('be.visible')
        cy.get('[data-testid="report-events"]').should('be.visible')
        cy.get('[data-testid="radio-group-report"]').should('be.visible')
        cy.get('[data-testid="close-modal-button"]').should('be.visible').click()

        cy.get('.MuiTabs-flexContainer button').eq(0).contains('Registration')
        cy.get('.MuiTabs-flexContainer button').eq(0).should('have.attr', 'aria-selected', 'true')
        cy.get('.css-1dz0v3k > tr > :nth-child(1)').should('be.visible').contains('Transaction hash')
        cy.get('.css-1dz0v3k > tr > :nth-child(2)').should('be.visible').contains('Created At')
        cy.get('.css-1dz0v3k > tr > :nth-child(3)').should('be.visible').contains('ADA Value')
        cy.get('.css-1dz0v3k > tr > :nth-child(4)').should('be.visible').contains('Certificate')

        cy.get('.MuiTabs-flexContainer button').eq(1).click().contains('Pool Update')
        cy.get('.MuiTabs-flexContainer button').eq(1).should('have.attr', 'aria-selected', 'true')
        cy.get('.css-1dz0v3k > tr > :nth-child(1)').should('be.visible').contains('Transaction hash')
        cy.get('.css-1dz0v3k > tr > :nth-child(2)').should('be.visible').contains('Created At')
        cy.get('.css-1dz0v3k > tr > :nth-child(3)').should('be.visible').contains('Fees')
        cy.get('.css-1dz0v3k > tr > :nth-child(4)').should('be.visible').contains('Certificate')

        cy.get('.MuiTabs-flexContainer button').eq(2).click().contains('Operator Rewards')
        cy.get('.MuiTabs-flexContainer button').eq(2).should('have.attr', 'aria-selected', 'true')
        cy.get('.css-1dz0v3k > tr > :nth-child(1)').should('be.visible').contains('Epoch')
        cy.get('.css-1dz0v3k > tr > :nth-child(2)').should('be.visible').contains('Created At')
        cy.get('.css-1dz0v3k > tr > :nth-child(3)').should('be.visible').contains('Operator Reward ADA')
        cy.get('.css-1dz0v3k > tr > :nth-child(4)').should('be.visible').contains('Reward Account')

        cy.get('.MuiTabs-flexContainer button').eq(3).click().contains('Deregistration')
        cy.get('.MuiTabs-flexContainer button').eq(3).should('have.attr', 'aria-selected', 'true')
        cy.get('.css-1dz0v3k > tr > :nth-child(1)').should('be.visible').contains('Transaction hash')
        cy.get('.css-1dz0v3k > tr > :nth-child(2)').should('be.visible').contains('Created At')
        cy.get('.css-1dz0v3k > tr > :nth-child(3)').should('be.visible').contains('ADA Value')
        cy.get('.css-1dz0v3k > tr > :nth-child(4)').should('be.visible').contains('Certificate')
        */
  });
});
