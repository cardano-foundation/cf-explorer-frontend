/// <reference types="cypress" />

describe("contracts spec", () => {
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
