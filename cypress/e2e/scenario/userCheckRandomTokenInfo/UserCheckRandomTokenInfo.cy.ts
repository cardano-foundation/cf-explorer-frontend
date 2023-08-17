describe("User check information of Random Token", () => {
    it("User go to Transaction and click to latest transaction, then verify the Token detail Screen", () => {
      cy.visit("/");
      cy.get('[data-testid="menu-button-blockchain"]').click();
      cy.get('[data-testid="submenu-button-native_tokens"]').click();
      cy.get('[data-testid="search-bar"]').should('be.visible');      
      cy.get('[data-testid="table-common"]').should('be.visible');    
      cy.get('[aria-label="pagination navigation"]').should('be.visible');    
      cy.get('span').contains('Per page').should('be.visible');    

      cy.get('[data-testid="table-common"] tbody tr').eq(0).click()
      cy.get('a').contains('View Details').should('be.visible');   
      cy.get('a').contains('View Details').click();
      cy.wait(2000);   

      cy.get('[data-testid="search-bar"]').should('be.visible');
      cy.get('p > div').should('be.visible');  
      cy.get('div').contains('Total Supply').should('be.visible'); 
      cy.get('div').contains('Total Transactions').should('be.visible'); 
      cy.get('div').contains('Policy Id').should('be.visible'); 
      cy.get('div').contains('Token Type').should('be.visible'); 
      cy.get('div').contains('Number of Holders').should('be.visible'); 
      cy.get('div').contains('Total Volume').should('be.visible'); 
      cy.get('div').contains('Volume 24H').should('be.visible'); 
      cy.get('div').contains('Created At').should('be.visible'); 
      cy.get('div').contains('Token Last Activity').should('be.visible'); 
      cy.get('div[class="recharts-responsive-container"]').should('be.visible');

      cy.get('[data-testid="footer"]').scrollIntoView();
      cy.get('[data-testid="table-common"] tbody tr').then(($element) => {
        if ($element.length > 10) {
            cy.get('[aria-label="pagination navigation"]').should('be.visible');    
            cy.get('span').contains('Per page').should('be.visible');
        }else{
            cy.log('Total record is less than 10')
        }
      });
    });
  });
  