/// <reference types="cypress" />

describe("transactions spec", () => {
  it("should navigate to the transactions page", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-blockchain"]').click();
    cy.get('[data-testid="submenu-button-transactions"]').click();
    cy.get('[data-testid="transactions-card"]').contains("Transactions");
    cy.get(`[data-testid="table-common"] tr th`).contains("Tx Hash", { matchCase: false });
    cy.get(`[data-testid="table-common"] tr th`).contains("Block", { matchCase: false });
    cy.get(`[data-testid="table-common"] tr th`).contains("Fees", { matchCase: false });
    cy.get(`[data-testid="table-common"] tr th`).contains("Output in ADA", { matchCase: false });
    cy.get(`[data-testid="table-common"] tr th`).contains("Input address", { matchCase: false });
    cy.get(`[data-testid="table-common"] tr th`).contains("Output address", { matchCase: false });
  });

  it("redirect to correct transaction detail page", () => {
    const txHash = "b87b6d4296d43480f4915cdd11a3b97f3fb48e997ea4973b922fec477808bcf6";
    cy.visit("/transactions");
    cy.get('[data-testid="transactions-card"]').contains("Transactions");
    cy.get('[data-testid="search-bar"]').type(txHash).type("{enter}");
    cy.get("div").contains("Transaction details", { matchCase: false });
    cy.get(".css-1kxgysv").contains(txHash);
  });

  it("should navigate to the transaction detail page", () => {
    const txHash = "b87b6d4296d43480f4915cdd11a3b97f3fb48e997ea4973b922fec477808bcf6";
    cy.visit("/transaction/b87b6d4296d43480f4915cdd11a3b97f3fb48e997ea4973b922fec477808bcf6");
    cy.get("div").contains("Transaction details");
    cy.get(".css-1kxgysv").contains(txHash);
    cy.get(":nth-child(1) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Input");
    cy.get(":nth-child(2) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Output");
    cy.get(":nth-child(3) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Created At", { matchCase: false });
    cy.get(":nth-child(4) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Confirmations", { matchCase: false });
    cy.get(":nth-child(5) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Total Output", { matchCase: false });
    cy.get(":nth-child(6) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Transaction Fees", {
      matchCase: false
    });
    cy.get(":nth-child(7) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Block");
    cy.get(":nth-child(8) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Slot");
    cy.get(".MuiAccordionSummary-content div").contains("Summary");
    cy.get(".MuiAccordionSummary-content div").contains("UTXOs");
  });
});
