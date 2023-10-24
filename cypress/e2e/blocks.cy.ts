/// <reference types="cypress" />
describe("block spec", () => {
  it("should navigate to the blocks page", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-blockchain"]').click();
    cy.get('[data-testid="submenu-button-blocks"]').click();
    cy.get('[data-testid="blocks-card"]').contains("Blocks");
  });

  it("should visit the blocks page", () => {
    cy.visit("/blocks");
    cy.get('[data-testid="blocks-card"]').contains("Blocks");
  });

  it("should show details of block 7588518", () => {
    cy.visit("/block/7588518");
    cy.get('[data-testid="block-details-total-output-in-ada"]').should("contain", "18,246,431.529342");
  });

  it("should have enough column", () => {
    cy.visit("/blocks");
    cy.get(`[data-testid="table-common"] tr th`).contains("Block");
    cy.get(`[data-testid="table-common"] tr th`).contains("Block ID");
    cy.get(`[data-testid="table-common"] tr th`).contains("Epoch", { matchCase: false });
    cy.get(`[data-testid="table-common"] tr th`).contains("Slot", { matchCase: false });
    cy.get(`[data-testid="table-common"] tr th`).contains("Created At");
    cy.get(`[data-testid="table-common"] tr th`).contains("Transactions");
    cy.get(`[data-testid="table-common"] tr th`).contains("Fees");
    cy.get(`[data-testid="table-common"] tr th`).contains("Output");
  });

  it("should have block search bar", () => {
    cy.visit("/blocks");
    cy.get('[data-testid="header-search"]').should("be.visible");
  });

  it("should navigate to the block detail page", () => {
    const block = "7588518";
    cy.visit("/block/7588518");
    cy.get(".css-1uehs23").contains("Block details", { matchCase: false });
    cy.get(":nth-child(1) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Created At");
    cy.get(":nth-child(2) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Confirmations");
    cy.get(":nth-child(3) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Transactions");
    cy.get(":nth-child(4) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Transaction Fees");
    cy.get('[data-testid="block-details-total-output-in-ada"]').should("contain", "18,246,431.529342");
    cy.get(":nth-child(6) > .css-seof3k").contains(block);
    cy.get(":nth-child(7) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Slot");
    cy.get('[data-testid="table-common"]').verifyElementDisplay;
    cy.get(`[data-testid="table-common"] tr th`).contains("Tx Hash", { matchCase: false });
    cy.get(`[data-testid="table-common"] tr th`).contains("Created At");
    cy.get(`[data-testid="table-common"] tr th`).contains("Block");
    cy.get(`[data-testid="table-common"] tr th`).contains("Addresses");
    cy.get(`[data-testid="table-common"] tr th`).contains("Fees");
    cy.get(`[data-testid="table-common"] tr th`).contains("Output in ADA");
  });
});
