
describe("Account Overview",()=>{
    beforeEach(()=>{
        cy.visit("/")
        cy.get('[data-testid="header-signin"]').click()
        cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').type('hanh.luu+2@sotatek.com')
        cy.get(':nth-child(3) > .MuiInputBase-root > .MuiInputBase-input').type('Test1234@')        
        cy.get('[data-testid="login-btn"]').click()
        
        cy.get('.css-1yoh286 > .css-0').click()
        cy.get('.css-hrok44').click()
    })

    it("should have search bar and title account overview", () => {
        cy.get('[data-testid="header-search"]').should("be.visible");
        cy.get('.css-1vqs061').contains('Account Overview')
    }); 

    it("should have enough columns of Address tab",()=>{
        cy.get('.css-1bv7r20').click()
        cy.get('.MuiTabs-flexContainer button').eq(0).should('have.attr', 'aria-selected', 'true')
        cy.get('tr > :nth-child(1)').should('be.visible').contains('Address')
        cy.get('tr > :nth-child(2)').should('be.visible').contains('Added On')
        cy.get('tr > :nth-child(3)').should('be.visible').contains('Action')
    })

    it("should have enough columns of Transaction tab",()=>{
        cy.get('.css-1bv7r20').click()
        cy.get('.MuiTabs-flexContainer button').eq(1).click()
        cy.get('.MuiTabs-flexContainer button').eq(1).should('have.attr', 'aria-selected', 'true')
        cy.get('tr > :nth-child(1)').should('be.visible').contains('Tnx Hash')
        cy.get('tr > :nth-child(2)').should('be.visible').contains('Added On')
        cy.get('tr > :nth-child(3)').should('be.visible').contains('Action')
    })

    it("should have enough columns of Block tab",()=>{
        cy.get('.css-1bv7r20').click()
        cy.get('.MuiTabs-flexContainer button').eq(2).click()
        cy.get('.MuiTabs-flexContainer button').eq(2).should('have.attr', 'aria-selected', 'true')
        cy.get('tr > :nth-child(1)').should('be.visible').contains('Block ID')
        cy.get('tr > :nth-child(2)').should('be.visible').contains('Added On')
        cy.get('tr > :nth-child(3)').should('be.visible').contains('Action')
    })

    it("should have enough columns of Epoch tab",()=>{
        cy.get('.css-1bv7r20').click()
        cy.get('.MuiTabs-flexContainer button').eq(3).click()
        cy.get('.MuiTabs-flexContainer button').eq(3).should('have.attr', 'aria-selected', 'true')
        cy.get('tr > :nth-child(1)').should('be.visible').contains('EPOCH #')
        cy.get('tr > :nth-child(2)').should('be.visible').contains('Added On')
        cy.get('tr > :nth-child(3)').should('be.visible').contains('Action')
    })

    it("should have enough columns of Pool tab",()=>{
        cy.get('.css-1bv7r20').click()
        cy.get('.MuiTabs-flexContainer button').eq(4).click()
        cy.get('.MuiTabs-flexContainer button').eq(4).should('have.attr', 'aria-selected', 'true')
        cy.get('tr > :nth-child(1)').should('be.visible').contains('Pool ID')
        cy.get('tr > :nth-child(2)').should('be.visible').contains('Added On')
        cy.get('tr > :nth-child(3)').should('be.visible').contains('Action')
    })

    it("should have enough columns of Stake Address tab",()=>{
        cy.get('.css-1bv7r20').click()
        cy.get('.MuiTabs-flexContainer button').eq(5).click()
        cy.get('.MuiTabs-flexContainer button').eq(5).should('have.attr', 'aria-selected', 'true')
        cy.get('tr > :nth-child(1)').should('be.visible').contains('Stake Address')
        cy.get('tr > :nth-child(2)').should('be.visible').contains('Added On')
        cy.get('tr > :nth-child(3)').should('be.visible').contains('Action')
    })
})