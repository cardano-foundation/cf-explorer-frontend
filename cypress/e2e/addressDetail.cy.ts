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
    cy.get(":nth-child(2) > .css-198fg3r > .css-1l7sjfb > .css-12euw8y").contains("Analytics");
    cy.get(":nth-child(3) > .css-198fg3r > .css-1l7sjfb > .css-12euw8y").contains("Transactions");
    cy.log(cy.$$(".css-1dz0v3k > tr > :nth-child(1)").html());
    cy.get(".css-1dz0v3k > tr > :nth-child(1)").contains("Tx Hash", { matchCase: false });
    cy.get(".css-1dz0v3k > tr > :nth-child(2)").contains("Created At");
    cy.get(".css-1dz0v3k > tr > :nth-child(3)").contains("Block");
    cy.get(".css-1dz0v3k > tr > :nth-child(4)").contains("Fees");
    cy.get(".css-1dz0v3k > tr > :nth-child(5)").contains("ADA amount");
    cy.get(".css-1dz0v3k > tr > :nth-child(6)").contains("Token");
  });
});
