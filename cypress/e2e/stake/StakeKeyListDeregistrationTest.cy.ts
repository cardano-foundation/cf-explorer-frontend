describe("Stake key de registration",()=>{
    beforeEach(()=>{
        cy.visit("/stake-address-de-registrations")
    })

    it("should have header search box",()=>{
        cy.get('[data-testid="header-search"]').should('be.visible')
        cy.get('[data-testid="all-filters-dropdown"] > .MuiSelect-select').contains('Addresses')
    })

    it("should have enough columns", ()=>{
        cy.get('.css-1dz0v3k > tr > :nth-child(1)').scrollIntoView().should('be.visible').contains('Tx Hash')
        cy.get('.css-1dz0v3k > tr > :nth-child(2)').scrollIntoView().should('be.visible').contains('Created At')
        cy.get('.css-1dz0v3k > tr > :nth-child(3)').scrollIntoView().should('be.visible').contains('Block')
        cy.get('.css-1dz0v3k > tr > :nth-child(4)').scrollIntoView().should('be.visible').contains('Stake Address')
        cy.get('.css-1dz0v3k > tr > :nth-child(5)').scrollIntoView().should('be.visible')
    })
})