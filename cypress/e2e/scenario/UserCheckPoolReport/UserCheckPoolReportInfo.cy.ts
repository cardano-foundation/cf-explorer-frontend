describe("User check information Pool Report random", () => {
  it("fake test", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-dashboard"]').contains("Dashboard");
  });
  /*
    it("Go to the Pool report and click random item, then verify infomation in this screen",()=>{
        cy.visit("/")
        cy.get('[data-testid="header-signin"]').click()
        cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').clear().type('hanh.luu+2@sotatek.com')
        cy.get(':nth-child(3) > .MuiInputBase-root > .MuiInputBase-input').clear().type('Test1234@')
        cy.get('[data-testid="login-btn"]').click()

        cy.get('[data-testid="menu-button-staking_lifecycle"]').click()
        cy.get('.MuiTabs-flexContainer button').eq(0).should('have.attr', 'aria-selected', 'true')

        cy.get('.MuiTabs-flexContainer button').eq(1).click()
        cy.get('.MuiTabs-flexContainer button').eq(1).should('have.attr', 'aria-selected', 'true')
        cy.get('.css-1dz0v3k > tr > :nth-child(1)').should('be.visible').contains('Created At')
        cy.get('.css-1dz0v3k > tr > :nth-child(2)').should('be.visible').contains('Report Name')
        cy.get('.css-1dz0v3k > tr > :nth-child(3)').should('be.visible').contains('Epoch Range')
        cy.get('.css-1dz0v3k > tr > :nth-child(4)').should('be.visible').contains('Pool Size')
        cy.get('.css-1dz0v3k > tr > :nth-child(5)').should('be.visible').contains('Events')
        cy.get('.css-1dz0v3k > tr > :nth-child(6)').should('be.visible').contains('Exporting Report')
        cy.get('[data-testid="table-common"] tr').eq(1).click()

        cy.get('[data-testid="table-common"]').should('be.visible')
        cy.get('.css-1dz0v3k > tr > :nth-child(1)').should('be.visible').contains('Transaction Hash')
        cy.get('.css-1dz0v3k > tr > :nth-child(2)').should('be.visible').contains('Created At')
        cy.get('.css-1dz0v3k > tr > :nth-child(3)').should('be.visible').contains('ADA Value')
        cy.get('.css-1dz0v3k > tr > :nth-child(4)').should('be.visible').contains('Certificate')

        cy.get('.MuiTabs-flexContainer button').eq(1).click()
        cy.get('.MuiTabs-flexContainer button').eq(1).should('have.attr', 'aria-selected', 'true')
        cy.get('[data-testid="table-common"]').should('be.visible')
        cy.get('.css-1dz0v3k > tr > :nth-child(1)').should('be.visible').contains('Transaction Hash')
        cy.get('.css-1dz0v3k > tr > :nth-child(2)').should('be.visible').contains('Created At')
        cy.get('.css-1dz0v3k > tr > :nth-child(3)').should('be.visible').contains('Fees')
        cy.get('.css-1dz0v3k > tr > :nth-child(4)').should('be.visible').contains('Certificate')


        cy.get('.MuiTabs-flexContainer button').eq(2).click()
        cy.get('.MuiTabs-flexContainer button').eq(2).should('have.attr', 'aria-selected', 'true')
        cy.get('[data-testid="table-common"]').should('be.visible')
        cy.get('.css-1dz0v3k > tr > :nth-child(1)').should('be.visible').contains('Epoch')
        cy.get('.css-1dz0v3k > tr > :nth-child(2)').should('be.visible').contains('Created At')
        cy.get('.css-1dz0v3k > tr > :nth-child(3)').should('be.visible').contains('Operator Reward ADA')
        cy.get('.css-1dz0v3k > tr > :nth-child(4)').should('be.visible').contains('Reward Account')

        cy.get('.MuiTabs-flexContainer button').eq(3).click()
        cy.get('.MuiTabs-flexContainer button').eq(3).should('have.attr', 'aria-selected', 'true')
        cy.get('[data-testid="table-common"]').should('be.visible')
        cy.get('.css-1dz0v3k > tr > :nth-child(1)').should('be.visible').contains('Transaction Hash')
        cy.get('.css-1dz0v3k > tr > :nth-child(2)').should('be.visible').contains('Created At')
        cy.get('.css-1dz0v3k > tr > :nth-child(3)').should('be.visible').contains('ADA Value')
        cy.get('.css-1dz0v3k > tr > :nth-child(4)').should('be.visible').contains('Certificate')

        cy.get('.MuiTabs-flexContainer button').eq(4).click()
        cy.get('.MuiTabs-flexContainer button').eq(4).should('have.attr', 'aria-selected', 'true')
        cy.get('[data-testid="table-common"]').should('be.visible')
        cy.get('.css-1dz0v3k > tr > :nth-child(1)').should('be.visible').contains('Pool size')
        cy.get('.css-1dz0v3k > tr > :nth-child(2)').should('be.visible').contains('Epoch')
    })
    */
});
