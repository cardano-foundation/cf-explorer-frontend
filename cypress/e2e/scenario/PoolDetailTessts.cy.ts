/// <reference types="cypress" />
describe("block spec", () => {
    it("should navigate to the blocks page", () => {
      cy.visit("/");
      cy.get('[data-testid="menu-button-blockchain"]').click();
      cy.get('[data-testid="submenu-button-pools"]').click();
      cy.get('tbody tr a', { timeout: 10000 }).eq(0).invoke("attr","aria-label").then(text =>{
        cy.get('tbody tr', { timeout: 10000 }).eq(0).click();
        cy.get('small').contains(text);
        cy.get('[data-testid="table-common"]').scrollIntoView().should('be.visible');
      });
      cy.get('table thead th').eq(0).contains("Epoch");
      cy.get('table thead th').eq(1).contains("Blocks");
      cy.get('table thead th').eq(2).contains("Stake Amount (A)");
      cy.get('table thead th').eq(3).contains("Delegator Rewards (A)");
      cy.get('table thead th').eq(4).contains("Fees (A)");
    });

  });