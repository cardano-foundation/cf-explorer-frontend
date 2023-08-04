/// <reference types="cypress" />

describe("contract scenario", () => {
    it("should navigate to the contract detail page", () => {
      const contactDetail = "addr1z8snz7c4974vzdpxu65ruphl3zjdvtxw8strf2c2tmqnxz2j2c79gy9l76sdg0xwhd7r0c0kna0tycz4y5s6mlenh8pq0xmsha";
      cy.visit("/");
      cy.get('[data-testid="menu-button-blockchain"]').click();
      cy.get('[data-testid="submenu-button-smart_contracts"]').click();
      cy.visit("/contracts/" + contactDetail);
      cy.get('small').contains(contactDetail);
      cy.get('th').contains("#").should("be.visible");
      cy.get('th').contains("Tx Hash").should("be.visible");
      cy.get('th').contains("Created At").should("be.visible");
      cy.get('th').contains("Block").should("be.visible");
      cy.get('th').contains("Addresses").should("be.visible");
      cy.get('th').contains("Fees").should("be.visible");
      cy.get('th').contains("Output").should("be.visible");
      cy.get('[id*=T-transaction]').contains("Transactions").should("be.visible");
      cy.get('[id*=T-transcript]').contains("Script").should("be.visible");
      cy.get('[data-testid="table-common"]').should("be.visible");
    });
  
  });