/// <reference types="cypress" />

describe("address detail spec", () => {
  it("redirect to correct the address detail page", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-blockchain"]').click();
    cy.get('[data-testid="submenu-button-transactions"]').click();
    cy.get('[data-testid="transactions-card"]').contains("Transactions");
    cy.get(":nth-child(1) > :nth-child(6) > :nth-child(1) > :nth-child(1) > .css-1l62pou").click();
    cy.get(".css-19nq3tn").contains("Address Details");
  });

  it("should navigate to the address detail page", () => {
    const address = "Ae2tdPwUPEZKnykUqXyYQxqJSnADNkm4ELUnyqZUBHcCrNJVDqozLYCt9Jv";
    cy.visit("/address/Ae2tdPwUPEZKnykUqXyYQxqJSnADNkm4ELUnyqZUBHcCrNJVDqozLYCt9Jv");
    cy.get(".css-19nq3tn").contains("Address Details");
    cy.get(".css-12n155v").contains(address);
    cy.get("div").contains("Analytics");
    cy.get("div").contains("Transactions");
    //cy.get(".css-1dz0v3k > tr > :nth-child(1)").contains("#");
    cy.get("table tr th").contains("Tx hash");
    cy.get("table tr th").contains("Created At");
    cy.get("table tr th").contains("Block");
    cy.get("table tr th").contains("Fees");
    cy.get("table tr th").contains("ADA amount");
    cy.get("table tr th").contains("Token");
  });
});
