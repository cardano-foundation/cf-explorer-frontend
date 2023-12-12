/// <reference types="cypress" />
describe("ADA handle cypress e2e test", () => {
  describe("should redirect to address detail", () => {
    const ADAname = "the.glenlivet";
    const address = "addr1w999n67e86jn6xal07pzxtrmqynspgx0fwmcmpua4wc6yzsxpljz3";

    it("should change page header when redirect to address detail", () => {
      cy.visit("/");
      cy.get('[data-testid="search-bar"]').type(ADAname).type("{enter}");
      cy.wait(1000);
      cy.get("button").contains(`Search ${ADAname} in ADA handle`, { matchCase: false }).should("be.visible").click();
      cy.wait(1000);
      cy.get("div").contains(`$${ADAname}`).should("be.visible");
      cy.url().should("include", `/address/$${ADAname}`);
      cy.get("span").contains("Analytics", { matchCase: false });
      cy.get("span").contains("Transactions", { matchCase: false });
    });

    it("should not change page header when redirect to address detail", () => {
      cy.visit("/");
      cy.get('[data-testid="search-bar"]').type(address).type("{enter}");
      cy.wait(1000);
      cy.get("div").contains("Address Details", { matchCase: false }).should("be.visible");
      cy.url().should("include", `/address/${address}`);
      cy.get("span").contains("Analytics", { matchCase: false });
      cy.get("span").contains("Transactions", { matchCase: false });
    });
  });

  describe("should redirect to stake detail", () => {
    const ADAname = "duc";
    const address = "stake1uyjvdl8pwjjz5j9m0fr82cf4r27yrkz3jljgsxw76k2m7cg0v4q56";

    it("should change page header when redirect to stake detail", () => {
      cy.visit("/");
      cy.get('[data-testid="search-bar"]').type(ADAname).type("{enter}");
      cy.wait(1000);
      cy.get("button").contains(`Search ${ADAname} in ADA handle`, { matchCase: false }).should("be.visible").click();
      cy.wait(1000);
      cy.get("div").contains(`$${ADAname}`).should("be.visible");
      cy.url().should("include", `/stake-address/$${ADAname}/delegation`);
      cy.get("span").contains("Analytics", { matchCase: false });
      cy.get("div .MuiButtonBase-root").contains("delegation history", { matchCase: false });
      cy.get("div .MuiButtonBase-root").contains("stake address history", { matchCase: false });
      cy.get("div .MuiButtonBase-root").contains("withdrawal history", { matchCase: false });
      cy.get("div .MuiButtonBase-root").contains("Instantaneous Rewards", { matchCase: false });
      cy.get("div .MuiButtonBase-root").contains("Transactions", { matchCase: false });
    });

    it("should not change page header redirect to address detail", () => {
      cy.visit("/");
      cy.get('[data-testid="search-bar"]').type(address).type("{enter}");
      cy.wait(1000);
      cy.get("div").contains("Stake Address Details", { matchCase: false }).should("be.visible");
      cy.url().should("include", `/stake-address/${address}/delegation`);
      cy.get("span").contains("Analytics", { matchCase: false });
      cy.get("div .MuiButtonBase-root").contains("delegation history", { matchCase: false });
      cy.get("div .MuiButtonBase-root").contains("stake address history", { matchCase: false });
      cy.get("div .MuiButtonBase-root").contains("withdrawal history", { matchCase: false });
      cy.get("div .MuiButtonBase-root").contains("Instantaneous Rewards", { matchCase: false });
      cy.get("div .MuiButtonBase-root").contains("Transactions", { matchCase: false });
    });
  });
});
