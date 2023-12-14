/// <reference types="cypress" />

describe("address detail spec", () => {
  it("redirect to correct the address detail page", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-blockchain"]').click();
    cy.get('[data-testid="submenu-button-transactions"]').click();
    cy.get('[data-testid="transactions-card"]').contains("Transactions");
    cy.get(`[data-testid="table-common"] tbody tr:nth-child(1) td:nth-child(8) a`).eq(0).click();
    cy.wait(1000);
    cy.get('[data-testid="address-detail-title"]').contains("Address Details", { matchCase: false });
  });

  it("should navigate to the address detail page", () => {
    const address = "Ae2tdPwUPEZKnykUqXyYQxqJSnADNkm4ELUnyqZUBHcCrNJVDqozLYCt9Jv";
    cy.visit("/address/Ae2tdPwUPEZKnykUqXyYQxqJSnADNkm4ELUnyqZUBHcCrNJVDqozLYCt9Jv");
    cy.get('[data-testid="address-detail-title"]').contains("Address Details");
    cy.get(".css-12n155v").contains(address);
    cy.get("div").contains("Analytics");
    cy.get("div").contains("Transactions");
    cy.get("table tr th").contains("Tx hash");
    cy.get("table tr th").contains("Created At");
    cy.get("table tr th").contains("Block");
    cy.get("table tr th").contains("Fees");
    cy.get("table tr th").contains("ADA amount");
    cy.get("table tr th").contains("Token");
  });
});
