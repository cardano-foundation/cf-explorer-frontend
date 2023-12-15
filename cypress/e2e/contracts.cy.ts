/// <reference types="cypress" />

describe("contracts spec", () => {
  it("should show the contract details of transaction 4223b55d78e90917c5a6054c8a038124f7b1c0ecefc6751dd8bcd6a5016ae2d1", () => {
    const transactionHash = "4223b55d78e90917c5a6054c8a038124f7b1c0ecefc6751dd8bcd6a5016ae2d1";
    cy.visit(`/transaction/${transactionHash}/contracts`);
    cy.get(".MuiAccordionSummary-content div").should("contain", `Contracts`);
  });

  it("redirect to correct address detail page", () => {
    const address =
      "addr1z8snz7c4974vzdpxu65ruphl3zjdvtxw8strf2c2tmqnxz2j2c79gy9l76sdg0xwhd7r0c0kna0tycz4y5s6mlenh8pq0xmsha";
    cy.visit("/contracts");
    cy.get("h2").contains("Smart Contracts");
    cy.get('[data-testid="search-bar"]').type(address).type("{enter}");
  });

  it("should display box output in SPEND contract", () => {
    const transactionHash = "6b9dd001db86e56d95ae3578280432472634e9c2c70905c9905c0b6e9955428c";
    cy.visit(`/transaction/${transactionHash}/contracts`);
    cy.wait(500);
    const parent = cy.get("div").contains("p", "spend", { matchCase: false }).scrollIntoView();
    parent.get("button").contains("view contract", { matchCase: false }).click();
    cy.get("p").contains("outputs", { matchCase: false }).should("be.visible");
    cy.get("p").contains("outputs", { matchCase: false }).click();
    cy.get("p").contains("View UTXO tab", { matchCase: false }).should("be.visible");
    cy.get("p").contains("View UTXO tab", { matchCase: false }).click();
    cy.url().should("include", "/utxOs");
    cy.get("div").contains("total input", { matchCase: false });
    cy.get("div").contains("total output", { matchCase: false });
  });
  it("should display box output in CERT contract", () => {
    const transactionHash = "f573784e80669fa0de1abce4179c669d70a6c759217bf2bb42886f115f7f6a22";
    cy.visit(`/transaction/${transactionHash}/contracts`);
    cy.wait(500);
    const parent = cy.get("div").contains("p", "cert", { matchCase: false }).scrollIntoView();
    parent.get("button").contains("view contract", { matchCase: false }).click();
    cy.get("p").contains("outputs", { matchCase: false }).should("be.visible");
    cy.get("p").contains("outputs", { matchCase: false }).click();
    cy.get("p").contains("View delegation tab", { matchCase: false }).should("be.visible");
    cy.get("p").contains("View delegation tab", { matchCase: false }).click();
    cy.url().should("include", "/delegations");
    cy.get("div").contains("delegations", { matchCase: false });
  });
  it("should display box output in REWARD contract", () => {
    const transactionHash = "7cc94bacaa21b9648f9b5fbced49b12c717ca8169a4aff65d240577e44f846c2";
    cy.visit(`/transaction/${transactionHash}/contracts`);
    cy.wait(500);
    const parent = cy.get("div").contains("p", "reward", { matchCase: false }).scrollIntoView();
    parent.get("button").contains("view contract", { matchCase: false }).click();
    cy.get("p").contains("outputs", { matchCase: false }).should("be.visible");
    cy.get("p").contains("outputs", { matchCase: false }).click();
    cy.get("p").contains("View withdrawal tab", { matchCase: false }).should("be.visible");
    cy.get("p").contains("View withdrawal tab", { matchCase: false }).click();
    cy.url().should("include", "/withdrawals");
    cy.get("div").contains("Wallet Addresses", { matchCase: false });
  });
});
