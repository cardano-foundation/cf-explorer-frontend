/// <reference types="cypress" />

describe("contracts spec", () => {
  it("should show the contract details of transaction 4223b55d78e90917c5a6054c8a038124f7b1c0ecefc6751dd8bcd6a5016ae2d1", () => {
    const transactionHash = "4223b55d78e90917c5a6054c8a038124f7b1c0ecefc6751dd8bcd6a5016ae2d1";
    const contractCount = 3;
    cy.visit(`/transaction/${transactionHash}/contracts`);
    cy.get(".MuiAccordionSummary-content div").should("contain", `Contracts(${contractCount})`);
  });

  it("redirect to correct address detail page", () => {
    const address =
      "addr1z8snz7c4974vzdpxu65ruphl3zjdvtxw8strf2c2tmqnxz2j2c79gy9l76sdg0xwhd7r0c0kna0tycz4y5s6mlenh8pq0xmsha";
    cy.visit("/contracts");
    cy.get("h2").contains("Smart Contracts");
    cy.get('[data-testid="search-bar"]').type(address).type("{enter}");
    cy.get(".css-19nq3tn").contains("Address Details");
    cy.get(".css-12n155v").contains(address);
  });
});
