/// <reference types="cypress" />
describe("ADA handle cypress e2e test", () => {
  const ADAname = "the.glenlivet";
  const ADAname2 = "duc";
  const address1 = "addr1w999n67e86jn6xal07pzxtrmqynspgx0fwmcmpua4wc6yzsxpljz3";
  const address2 = "stake1uyjvdl8pwjjz5j9m0fr82cf4r27yrkz3jljgsxw76k2m7cg0v4q56";
  it("should show ADA autocomplete when search by all filter and navigate to address detail when click", () => {
    cy.visit("/");
    cy.get('[data-testid="search-bar"]').type(ADAname).type("{enter}");
    cy.wait(1000);
    cy.get("button").contains(`Search ${ADAname} in ADA handle`, { matchCase: false }).should("be.visible").click();
    cy.wait(1000);
    cy.title().should("eq", `Address $${ADAname} | Cardano Blockchain Explorer`);
    cy.get("div").contains("the.glenlivet Details", { matchCase: false }).should("be.visible");
    cy.get("div").contains("Address", { matchCase: false }).should("be.visible");
    cy.get("div").contains("Stake Address", { matchCase: false }).should("be.visible");
    cy.get("span").contains("Analytics", { matchCase: false });
    cy.get("span").contains("Transactions", { matchCase: false });
  });

  it("should navigate to address detail when search by addresses", () => {
    cy.visit("/");
    cy.get('[data-testid="all-filters-dropdown"]').click();
    cy.get("li").contains("Addresses", { matchCase: false }).click();
    cy.get('[data-testid="search-bar"]').type(ADAname).type("{enter}");
    cy.wait(1000);
    cy.title().should("eq", `Address $${ADAname} | Cardano Blockchain Explorer`);
    cy.get("div").contains("the.glenlivet Details", { matchCase: false }).should("be.visible");
    cy.get("div").contains("Address", { matchCase: false }).should("be.visible");
    cy.get("div").contains("Stake Address", { matchCase: false }).should("be.visible");
    cy.get("span").contains("Analytics", { matchCase: false });
    cy.get("span").contains("Transactions", { matchCase: false });
  });

  it("should navigate to stake detail when search", () => {
    cy.visit("/");
    cy.get('[data-testid="search-bar"]').type(ADAname2).type("{enter}");
    cy.wait(1000);
    cy.get("button").contains(`Search ${ADAname2} in ADA handle`, { matchCase: false }).should("be.visible").click();
    cy.wait(1000);
    cy.title().should("eq", `Stake address $${ADAname2} | Cardano Blockchain Explorer`);
    cy.get("div").contains("the.glenlivet Details", { matchCase: false }).should("be.visible");
    cy.get("div").contains("Address", { matchCase: false }).should("be.visible");
    cy.get("div").contains("Stake Address", { matchCase: false }).should("be.visible");
    cy.get("div").contains("Analytics", { matchCase: false });
    cy.get("div").contains("Transactions", { matchCase: false });
  });

  it("should not change page header when redirect by address", () => {
    cy.visit("/");
    cy.get('[data-testid="search-bar"]').type(address1).type("{enter}");
    cy.wait(1000);
    cy.title().should("eq", `Address ${address1} | Cardano Blockchain Explorer`);
    cy.get("div").contains(`$${ADAname2}`).should("be.visible");
    cy.get("small").contains("stake address", { matchCase: false }).should("be.visible");
    cy.get("div").contains("Stake Address").should("be.visible");
    cy.get("span").contains("Analytics");
  });

  it("should not change page header when redirect by stake address", () => {
    cy.visit("/");
    cy.get('[data-testid="search-bar"]').type(address2).type("{enter}");
    cy.wait(1000);
    cy.title().should("eq", `Stake address ${address2} | Cardano Blockchain Explorer`);
    cy.get("div").contains(`stake address detail`, { matchCase: false }).should("be.visible");
    cy.get("span").contains("Analytics");
  });
});
