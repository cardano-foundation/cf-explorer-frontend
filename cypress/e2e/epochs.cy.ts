/// <reference types="cypress" />
describe("epoch spec", () => {
  it("should navigate to the blocks page", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-blockchain"]').click();
    cy.get('[data-testid="submenu-button-epochs"]').click();
    cy.get('[data-testid="table-common"]').contains("Epoch");
  });

  it("should visit the blocks page", () => {
    cy.visit("/epochs");
    cy.get('[data-testid="table-common"]').contains("Epoch");
  });

  it("should have enough column", () => {
    cy.visit("/epochs");
    cy.get("table tr th").contains("Epoch");
    cy.get("table tr th").contains("Start Timestamp", { matchCase: false });
    cy.get("table tr th").contains("End Timestamp", { matchCase: false });
    cy.get("table tr th").contains("Blocks");
    cy.get("table tr th").contains("Unique Accounts", { matchCase: false });
    cy.get("table tr th").contains("Transaction Count", { matchCase: false });
    cy.get("table tr th").contains("Rewards Distributed", { matchCase: false });
    cy.get("table tr th").contains("Total Output", { matchCase: false });
  });

  it("should have epoch search bar", () => {
    cy.visit("/epochs");
    cy.get('[data-testid="header-search"]').should("be.visible");
  });

  it("redirect to correct epoch detail page", () => {
    const epoch = "426";
    cy.visit("/epochs");
    cy.get('[data-testid="search-bar"]').type(epoch).type("{enter}");
    cy.get("div").contains("Epoch details");
    cy.get(".css-17lbe4a").contains(epoch);
  });

  it.only("should navigate to the epoch detail page", () => {
    const epoch = "426";
    cy.visit("/epoch/426");
    cy.get("div").contains("Epoch details", { matchCase: false });
    cy.get(".css-17lbe4a").contains(epoch);
    cy.get(":nth-child(1) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Start Timestamp", {
      matchCase: false
    });
    cy.get(":nth-child(2) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("End Timestamp", { matchCase: false });
    cy.get(":nth-child(3) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Total Output", { matchCase: false });
    cy.get(":nth-child(4) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Blocks");
    cy.get(":nth-child(5) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Slot");
    cy.get(":nth-child(6) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Unique Accounts", {
      matchCase: false
    });
    cy.get(":nth-child(7) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Transaction Count", {
      matchCase: false
    });
    cy.get(":nth-child(8) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Rewards Distributed", {
      matchCase: false
    });
    cy.get('[data-testid="table-common"]').verifyElementDisplay;
    cy.get(".css-1dz0v3k > tr > :nth-child(1)").contains("Block");
    cy.get(".css-1dz0v3k > tr > :nth-child(2)").contains("Block ID");
    cy.get(".css-1dz0v3k > tr > :nth-child(3)").contains("Epoch / Slot");
    cy.get(".css-1dz0v3k > tr > :nth-child(4)").contains("Created At");
    cy.get(".css-1dz0v3k > tr > :nth-child(5)").contains("Transactions");
    cy.get(".css-1dz0v3k > tr > :nth-child(6)").contains("Fees");
    cy.get(".css-1dz0v3k > tr > :nth-child(7)").contains("Output");
  });
});
