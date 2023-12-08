/// <reference types="cypress" />
describe("ADA handle cypress e2e test", () => {
  const ADAname = "duc";
  it("should navigate to stake detail when search by ADA handle", () => {
    cy.visit("/");
    cy.get('[data-testid="search-bar"]').type(ADAname).type("{enter}");
    cy.wait(1000);
    cy.get("button").contains(`Search ${ADAname} in ADA handle`, { matchCase: false }).should("be.visible").click();
    cy.wait(1000);
    cy.title().should("eq", `Address ${ADAname} | Cardano Blockchain Explorer`);
  });
});
