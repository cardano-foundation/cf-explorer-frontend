describe("User check Bookmark - Stake Address in My Profile", () => {
    it("User go to Dashboard and sign in, then verify the Bookmark - Stake Address in My Profile Screen", () => {
      const email ='hanh.luu+2@sotatek.com';
      const password ='Test1234@';

      cy.visit("/");
      cy.get('button').contains('Sign In').click();
      cy.get("input[name='email']").type(email);
      cy.get("input[name='password']").type(password);
      cy.get('[data-testid="login-btn"]').click();
      
      cy.get('[data-testid="header-top"] >div>div>button').click();
      cy.get('h4').contains('Account').click();

      cy.get('a').contains('Bookmark').click();
      cy.get('button').contains('Stake Address').click();
      cy.get('[data-testid="table-common"]').should('be.visible');
      cy.get('th').contains('Stake Address').should('be.visible');
      cy.get('th').contains('Added On').should('be.visible');
      cy.get('th').contains('Action').should('be.visible');
    });
  });