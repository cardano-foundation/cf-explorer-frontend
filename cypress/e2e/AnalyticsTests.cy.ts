describe("Analytics Test", ()=>{
    beforeEach(()=>{
        cy.visit("/token/asset17q7r59zlc3dgw0venc80pdv566q6yguw03f0d9/transactions")
    })

    it("should have correct title and display chart", ()=>{
        cy.get('.css-12euw8y').contains('Analytics')
        cy.get('.css-1op8e0m').should('be.visible')
        cy.get('.css-1bk6dme').contains('Volume')
    })

    it("should have enough button time", ()=>{
        cy.get('.MuiGrid-grid-xs-8 > .MuiBox-root > :nth-child(1)').should('be.visible').contains('1d')
        cy.get('.MuiGrid-grid-xs-8 > .MuiBox-root > :nth-child(2)').should('be.visible').contains('1w')
        cy.get('.MuiGrid-grid-xs-8 > .MuiBox-root > :nth-child(3)').should('be.visible').contains('1m')
        cy.get('.MuiGrid-grid-xs-8 > .MuiBox-root > :nth-child(4)').should('be.visible').contains('3m')
    })
})