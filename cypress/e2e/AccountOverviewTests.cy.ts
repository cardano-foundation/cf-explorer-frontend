/// <reference types="cypress" />

describe("Account setting & profile", () => {
    it("should navigate to the blocks page", () => {
      cy.visit("/sign-in");
      cy.get('input[name="email"]').type("binh.nguyen@sotatek.com");
      cy.get('input[name="password"]').type("Test1234@");
      cy.get('[data-testid="login-btn"]').click();
      cy.get('[data-testid="home-title"]').should("exist");
      cy.get('[data-testid="header-signin"]').should("not.exist");
      cy.visit("/account/profile");

      cy.get('[data-testid="PersonIcon"]').should("be.visible");
      cy.get('.css-llqgi6').invoke("text").then(text => {
        expect(text).to.be.equal("binh.nguyen@sotatek.com");
      })
  });
})