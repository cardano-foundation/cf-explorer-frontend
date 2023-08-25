describe("User check My Profile", () => {
  it("fake test", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-dashboard"]').contains("Dashboard");
  });
  /*
    it("User go to Dashboard and sign in, then verify the My Profile Screen", () => {
      const email ='hanh.luu+2@sotatek.com';
      const password ='Test1234@';

      cy.visit("/");
      cy.get('button').contains('Sign In').click();
      cy.get("input[name='email']").type(email);
      cy.get("input[name='password']").type(password);
      cy.get('[data-testid="login-btn"]').click();

      cy.get('[data-testid="header-top"] >div>div>button').click();
      cy.get('h4').contains('Account').click();

      cy.get('[data-testid="all-filters-dropdown"]').should('be.visible');
      cy.get('[data-testid="search-bar"]').should('be.visible');
      cy.get('div').contains(email).should('be.visible');
      cy.get('h2').contains('Account Overview').should('be.visible');
      cy.get('div').contains('You are logged in as').should('be.visible');
      cy.get('div').contains('Last Login').should('be.visible');
    });*/
});
