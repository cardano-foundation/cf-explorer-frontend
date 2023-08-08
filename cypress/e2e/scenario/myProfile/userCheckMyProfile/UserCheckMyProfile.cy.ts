describe("User check My Profile", () => {
    it("User go to Dashboard and sign in, then verify the My Profile Screen", () => {
      const email ='hanh.luu+2@sotatek.com';
      const password ='Test1234@';

      cy.visit("/");
      cy.get('button').contains('Sign In').click();
      cy.get("input[placeholder='Email Address']").type(email);
      cy.get("input[placeholder='Password']").type(password);
      cy.get('[data-testid="login-btn"]').click();
      
      cy.get('[data-testid="header-top"] >div>div>button').click();
      cy.get('h4').contains('User Profile').click();

      cy.get('[data-testid="all-filters-dropdown"]').should('be.visible');
      cy.get('[data-testid="search-bar"]').should('be.visible');
      cy.get('div').contains(email).should('be.visible');
      cy.get('h2').contains('Account Overview').should('be.visible');
      cy.get('div').contains('Your email address').should('be.visible');
      cy.get('div').contains('Address Bookmark').should('be.visible');
      cy.get('div').contains('Wallet').should('be.visible');
      cy.get('div').contains('Last Login').should('be.visible');
    });
  });