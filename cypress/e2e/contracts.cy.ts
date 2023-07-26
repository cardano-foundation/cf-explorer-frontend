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
});
