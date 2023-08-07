/// <reference types="cypress" />
describe("Pool Certificate", () => {
    it("should navigate to the transaction detail from pool certificate e2e", () => {
      cy.visit("/");
      cy.get('[data-testid="menu-button-operational_certificates"]').click();
      cy.get('[data-testid="submenu-button-pool_certificate"]').click();
      cy.get('tbody tr td').first().click();
      cy.get('[class*="MuiGrid-root"]').first().should("be.visible");
      cy.get('[data-testid="tab-summary"]').should("be.visible");
      cy.get('[data-testid="tab-utxOs"]').should("be.visible");
      cy.get('[data-test-id="CircularProgressbarWithChildren__children"]').should("be.visible");
    });

    it("should navigate to the transaction detail from instantanous reward e2e", () => {
      cy.visit("/");
      cy.get('[data-testid="menu-button-operational_certificates"]').click();
      cy.get('[data-testid="submenu-button-instantaneous_rewards_"]').click();
      cy.get('tbody tr td a').first().click();
      cy.get('[class*="MuiGrid-root"]').first().should("be.visible");
      cy.get('[data-testid="tab-summary"]').should("be.visible");
      cy.get('[data-testid="tab-utxOs"]').should("be.visible");
      cy.get('[data-test-id="CircularProgressbarWithChildren__children"]').should("be.visible");
    });
    it("should navigate to the transaction detail from pool deregistration e2e", () => {
      cy.visit("/");
      cy.get('[data-testid="menu-button-operational_certificates"]').click();
      cy.get('[data-testid="submenu-button-pool_deregistration"]').click();
      cy.get('tbody tr td a').first().click();
      cy.get('[class*="MuiGrid-root"]').first().should("be.visible");
      cy.get('[data-testid="tab-summary"]').should("be.visible");
      cy.get('[data-testid="tab-utxOs"]').should("be.visible");
      cy.get('[data-test-id="CircularProgressbarWithChildren__children"]').should("be.visible");
    });

  });
  