/// <reference types="cypress" />

describe("contracts spec", () => {
  it("should show the contract details of transaction 4223b55d78e90917c5a6054c8a038124f7b1c0ecefc6751dd8bcd6a5016ae2d1", () => {
    const transactionHash = "4223b55d78e90917c5a6054c8a038124f7b1c0ecefc6751dd8bcd6a5016ae2d1";
    const contractHash =
      "addr1zxn9efv2f6w82hagxqtn62ju4m293tqvw0uhmdl64ch8uw6j2c79gy9l76sdg0xwhd7r0c0kna0tycz4y5s6mlenh8pq6s3z70";
    const contractCount = 3;

    const datumBytes =
      "d8799fd8799fd8799f581c4a8508ee9d864103b28f86bd004c74551dcb9a99493e07d6c5f965c1ffd8799fd8799fd8799f581c3ff922f6a662e2ee1e48f6f7e9a2dc337f4483e0ef3a247466b29babffffffffd8799fd8799f581c4a8508ee9d864103b28f86bd004c74551dcb9a99493e07d6c5f965c1ffd8799fd8799fd8799f581c3ff922f6a662e2ee1e48f6f7e9a2dc337f4483e0ef3a247466b29babffffffffd87a80d8799fd8799f4040ff1a16cb22ccff1a001e79ea1a001e8480ff";
    const datumHash = "a5e7b0301a29d8a00ada775d1b0c4bda47573e3de06214445e0e0590302b62be";

    cy.visit(`/transaction/${transactionHash}/contracts`);
    cy.get('[data-testid="tab-contracts"]').should("contain", `Contracts(${contractCount})`);
    cy.get(`[data-testid="contract-hash-${contractHash}"]`).should("contain", contractHash);

    cy.get(`[data-testid="contract-redeemer-tag-${contractHash}"]`).should("contain", "SPEND");
    cy.get(`[data-testid="contract-redeemer-data-${contractHash}"]`).should("contain", "d87980");
    cy.get(`[data-testid="contract-redeemer-mem-${contractHash}"]`).should("contain", "61056");
    cy.get(`[data-testid="contract-redeemer-steps-${contractHash}"]`).should("contain", "22010239");

    cy.get(`[data-testid="contract-datum-hash-${contractHash}"]`).should("contain", datumHash);
    cy.get(`[data-testid="contract-datum-bytes-${contractHash}"]`).should("contain", datumBytes);
  });

  it("should navigate to the contract page", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-blockchain"]').click();
    cy.get('[data-testid="submenu-button-smart_contracts"]').click();
    cy.get(".css-1l7sjfb").contains("Contracts");
    cy.get(".css-1dz0v3k > tr > :nth-child(1)").contains("#");
    cy.get(".css-1dz0v3k > tr > :nth-child(2)").contains("Contract Addresses");
    cy.get(".css-1dz0v3k > tr > :nth-child(3)").contains("Balance");
    cy.get(".css-1dz0v3k > tr > :nth-child(4)").contains("Value");
    cy.get(".css-1dz0v3k > tr > :nth-child(5)").contains("Transaction Count");
  });

  it("redirect to correct address detail page", () => {
    const address =
      "addr1z8snz7c4974vzdpxu65ruphl3zjdvtxw8strf2c2tmqnxz2j2c79gy9l76sdg0xwhd7r0c0kna0tycz4y5s6mlenh8pq0xmsha";
    cy.visit("/contracts");
    cy.get(".css-1l7sjfb").contains("Contracts");
    cy.get('[data-testid="search-bar"]').type(address).type("{enter}");
    cy.get(".css-19nq3tn").contains("Address Details");
    cy.get(".css-12n155v").contains(address);
  });

  it.only("should navigate to the contract detail page", () => {
    cy.visit("/contracts");
    cy.get(".css-1l7sjfb").contains("Contracts");
    cy.get(":nth-child(1) > :nth-child(1) > div > .css-1l62pou").click();
    cy.get(".css-1msjg76 > .css-0").contains("Contract Details");
    cy.get(":nth-child(1) > .css-1heutcx > .css-k6svam > .css-1xc8op").contains("Address");
    cy.get(":nth-child(2) > .css-1heutcx > .css-k6svam > .css-1xc8op").contains("Stake Address");
    cy.get('[id*="T-transaction"]').contains("Transaction");
    cy.get(".css-1g7hqaj").contains("Script");
  });
});
