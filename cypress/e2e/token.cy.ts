/// <reference types="cypress" />

describe("token spec", () => {
  it("should navigate to the token list page", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-blockchain"]').click();
    cy.get('[data-testid="submenu-button-native_tokens"]').click();
    cy.get("h2").contains("Native Tokens");
    cy.get(".css-1dz0v3k > tr > :nth-child(1)").contains("Icon");
    cy.get(".css-1dz0v3k > tr > :nth-child(2)").contains("Asset Name", { matchCase: false });
    cy.get(".css-1dz0v3k > tr > :nth-child(3)").contains("Policy ID", { matchCase: false });
    cy.get(".css-1dz0v3k > tr > :nth-child(4)").contains("Total Transactions", { matchCase: false });
    cy.get(".css-1dz0v3k > tr > :nth-child(5)").contains("Number of Holders", { matchCase: false });
    cy.get(".css-1dz0v3k > tr > :nth-child(6)").contains("Total Volume", { matchCase: false });
    cy.get(".css-1dz0v3k > tr > :nth-child(7)").contains("Volume 24H", { matchCase: false });
    cy.get(".css-1dz0v3k > tr > :nth-child(8)").contains("Total Supply", { matchCase: false });
    cy.get(".css-1dz0v3k > tr > :nth-child(9)").contains("Created At", { matchCase: false });
  });

  it("redirect to correct token detail page", () => {
    const tokenName = "HOSKY";
    cy.visit("/tokens");
    cy.get("h2").contains("Native Tokens");
    cy.get('[data-testid="search-bar"]').type(tokenName).type("{enter}");
    cy.get(".css-cssveg > :nth-child(1) > :nth-child(2)").contains(tokenName);
    cy.get(":nth-child(1) > :nth-child(2) > .css-1945haz").click();
  });

  it("should navigate to the token detail page", () => {
    const tokenId = "asset17q7r59zlc3dgw0venc80pdv566q6yguw03f0d9";
    const tokenName = "HOSKY";
    cy.visit("/token/asset17q7r59zlc3dgw0venc80pdv566q6yguw03f0d9/transactions");
    cy.get(".css-d1xa0j > .MuiBox-root").contains(tokenName);
    cy.get(".css-1kxgysv").contains(tokenId);
    cy.get(".css-1s8g7c7 > span").contains(tokenName);
    cy.get(":nth-child(2) > .css-13ne0mf > .MuiBox-root").contains("Total Supply", { matchCase: false });
    cy.get(":nth-child(3) > .css-13ne0mf > .MuiBox-root").contains("Policy Id", { matchCase: false });
    cy.get(":nth-child(4) > .css-13ne0mf > .MuiBox-root").contains("Total Transactions", { matchCase: false });
    cy.get(":nth-child(5) > .css-13ne0mf > .MuiBox-root").contains("Token Type", { matchCase: false });
    cy.get(":nth-child(6) > .css-13ne0mf > .MuiBox-root").contains("Number of Holders", { matchCase: false });
    cy.get(":nth-child(7) > .css-13ne0mf > .MuiBox-root").contains("Total Volume", { matchCase: false });
    cy.get(":nth-child(8) > .css-13ne0mf > .MuiBox-root").contains("Volume 24H", { matchCase: false });
    cy.get(":nth-child(9) > .css-13ne0mf > .MuiBox-root").contains("Created At", { matchCase: false });
    cy.get(":nth-child(10) > .css-13ne0mf > .MuiBox-root").contains("Token Last Activity", { matchCase: false });
    cy.get(".css-12euw8y").contains("Analytics");
    cy.get(".css-tedkql").contains("Transactions");
    cy.get("button[id*='topHolders'] div div").last().contains("Top Holders", { matchCase: false });
    cy.get("button[id*='tokenMint'] div div").last().contains("Minting");
    cy.get("button[id*='metadata'] div div").last().contains("Metadata");
  });
});
