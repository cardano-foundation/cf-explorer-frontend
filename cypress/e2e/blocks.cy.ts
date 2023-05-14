/// <reference types="cypress" />

describe('template spec', () => {
  it('should navigate to the blocks page', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="toggle-sidebar-icon"]').click();
    cy.get('[data-testid="menu-button-blockchain"]').click();
    cy.get('[data-testid="submenu-button-blocks"]').click();
    cy.get('[data-testid="blocks-card"]').contains('Blocks');
  });

  it('should visit the blocks page', () => {
    cy.visit('http://localhost:3000/blocks');
    cy.get('[data-testid="blocks-card"]').contains('Blocks');
  });

  it('should show details of block 8237492', () => {
    cy.visit('http://localhost:3000/block/8237492');
    cy.get('[data-testid="block-details-total-output-in-ada"]').should('contain', '3,377,473.111701');
  });
});
