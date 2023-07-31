describe("Policy Detail ", () => {
    it("should navigate to the policy detail page", () => {
        const policyId = "4247d5091db82330100904963ab8d0850976c80d3f1b927e052e07bd";
        cy.visit("/en/policy/4247d5091db82330100904963ab8d0850976c80d3f1b927e052e07bd");
        cy.get('.css-116ym5a').invoke("text").then(text =>{
            expect(text).to.be.equal(policyId);
        })
    })
    it("should navigate to the policy detail page", () => {
        const policyId = "4247d5091db82330100904963ab8d0850976c80d3f1b927e052e07bd";
        cy.visit("/en/policy/4247d5091db82330100904963ab8d0850976c80d3f1b927e052e07bd");
        cy.get('.css-1dz0v3k > tr > :nth-child(1)').should("be.visible");
        cy.get('.css-1dz0v3k > tr > :nth-child(2)').should("be.visible");
        cy.get('.css-1dz0v3k > tr > :nth-child(3)').should("be.visible");
        cy.get('.css-1dz0v3k > tr > :nth-child(4)').should("be.visible");
        cy.get('.css-1dz0v3k > tr > :nth-child(5)').should("be.visible");
    })
})