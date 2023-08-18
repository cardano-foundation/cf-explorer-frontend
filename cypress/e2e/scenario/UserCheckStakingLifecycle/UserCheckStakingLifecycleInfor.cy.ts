describe("User check information of Staking Lifecycle screen", () => {
  it("fake test", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-dashboard"]').contains("Dashboard");
  });
  /*
    it("User go Staking Delegation Lifecycle Details, then verify infomation registration, delegation, rewards distribute, rewards withdrawal, deregistration",()=>{
        cy.visit("/")
        cy.get('[data-testid="header-signin"]').click()
        cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').clear().type('hanh.luu+2@sotatek.com')
        cy.get(':nth-child(3) > .MuiInputBase-root > .MuiInputBase-input').clear().type('Test1234@')
        cy.get('[data-testid="login-btn"]').click()
        cy.get('[data-testid="menu-button-staking_lifecycle"]').click()
        cy.get('.css-dkcpqo').clear().type('stake1u9h5g7m75hwhqnesgz0mkdk5qqhnhzpyfwj2l2tm6n28v4s2w8uqq').type(`{enter}`)

        cy.get('.css-11rj123').should('have.attr', 'active', 1)
        cy.get('.css-2nls1a').contains('Switch to tabular view')
        cy.get('.css-13nxg8k').click().should('have.attr', 'active', 1)
        cy.get('.css-2nls1a').contains('Switch to timeline view')
        cy.get('.css-18gbrsc > .MuiButtonBase-root').should('be.visible')

        cy.get('.css-18gbrsc > .MuiButtonBase-root').click()
        cy.get('[data-testid="date-range-picker"]').should('be.visible')
        cy.get('[data-testid="radio-group-report"]').should('be.visible')
        cy.get('[data-testid="report-events"]').should('be.visible')
        cy.get('[data-testid="next-step"]').should('be.visible')
        cy.get('[data-testid="close-modal-button"]').should('be.visible').click()

        cy.get('.MuiTabs-flexContainer button').eq(0).should('have.attr', 'aria-selected', 'true').contains('Registration')
        cy.get('.css-1dz0v3k > tr > :nth-child(1)').should('be.visible').contains('Transaction Hash')
        cy.get('.css-1dz0v3k > tr > :nth-child(2)').should('be.visible').contains('Created At')
        cy.get('.css-1dz0v3k > tr > :nth-child(3)').should('be.visible').contains('ADA Value')
        cy.get('.css-1dz0v3k > tr > :nth-child(4)').should('be.visible').contains('Certificate')

        cy.get('.MuiTabs-flexContainer button').eq(1).click()
        cy.get('.MuiTabs-flexContainer button').eq(1).should('have.attr', 'aria-selected', 'true').contains('Delegation History')
        cy.get('.css-1dz0v3k > tr > :nth-child(1)').should('be.visible').contains('Transaction Hash')
        cy.get('.css-1dz0v3k > tr > :nth-child(2)').should('be.visible').contains('Created At')
        cy.get('.css-1dz0v3k > tr > :nth-child(3)').should('be.visible').contains('Fees')
        cy.get('.css-1dz0v3k > tr > :nth-child(4)').should('be.visible').contains('Certificate')

        cy.get('.MuiTabs-flexContainer button').eq(2).click()
        cy.get('.MuiTabs-flexContainer button').eq(2).should('have.attr', 'aria-selected', 'true').contains('Rewards Distribution')
        cy.get('.css-1dz0v3k > tr > :nth-child(1)').should('be.visible').contains('Rewards Paid')
        cy.get('.css-1dz0v3k > tr > :nth-child(2)').should('be.visible').contains('Created At')
        cy.get('.css-1dz0v3k > tr > :nth-child(3)').should('be.visible').contains('Epoch')

        cy.get('.MuiTabs-flexContainer button').eq(3).click()
        cy.get('.MuiTabs-flexContainer button').eq(3).should('have.attr', 'aria-selected', 'true').contains('Withdrawal History')
        cy.get('.css-1dz0v3k > tr > :nth-child(1)').should('be.visible').contains('Transaction Hash')
        cy.get('.css-1dz0v3k > tr > :nth-child(2)').should('be.visible').contains('Created At')
        cy.get('.css-1dz0v3k > tr > :nth-child(3)').should('be.visible').contains('Net Amount')

        cy.get('.MuiTabs-flexContainer button').eq(4).click()
        cy.get('.MuiTabs-flexContainer button').eq(4).should('have.attr', 'aria-selected', 'true').contains('Deregistration')
        cy.get('.css-1dz0v3k > tr > :nth-child(1)').should('be.visible').contains('Transaction Hash')
        cy.get('.css-1dz0v3k > tr > :nth-child(2)').should('be.visible').contains('Created At')
        cy.get('.css-1dz0v3k > tr > :nth-child(3)').should('be.visible').contains('ADA Amount')
        cy.get('.css-1dz0v3k > tr > :nth-child(4)').should('be.visible').contains('Certificate')
    })
    */
});
