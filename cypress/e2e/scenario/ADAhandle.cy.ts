/// <reference types="cypress" />
describe("ADA handle cypress e2e test", () => {
  describe("should redirect to stake detail", () => {
    const ADAname = "the.glenlivet";
    const address = "stake1u8yf3kcjaaa6hwp9jankxql49kyh2mu02q8454zxzkvzxgg6uhtm4";

    it.skip("should change page header when search by all filter", () => {
      cy.visit("/");
      cy.get('[data-testid="search-bar"]').type(ADAname).type("{enter}");
      cy.wait(1000);
      cy.get('[data-testid="option-ada-hanlde"]')
        .contains(`Search ${ADAname} in ADA handle`, { matchCase: false })
        .should("be.visible")
        .click();
      cy.wait(1000);
      cy.get("div").contains(`$${ADAname}`).should("be.visible");
      cy.url().should("include", `/stake-address/$${ADAname}`);
    });

    it("should change page header when search by ADA Handle", () => {
      cy.visit("/");
      cy.get('[data-testid="all-filters-dropdown"]').click();
      cy.get("li").contains("ADA handle", { matchCase: false }).click();
      cy.get('[data-testid="search-bar"]').type(ADAname).type("{enter}");
      cy.wait(1000);
      cy.get("div .css-1baulvz").contains(`$${ADAname}`).should("be.visible");
      cy.url().should("include", `/stake-address/$${ADAname}`);
    });

    it("should not change page header when redirect to address detail", () => {
      cy.visit("/");
      cy.get('[data-testid="search-bar"]').type(address).type("{enter}");
      cy.wait(1000);
      cy.get("div").contains("Stake Address Details", { matchCase: false }).should("be.visible");
      cy.url().should("include", `/stake-address/${address}`);
    });
  });
});
