/// <reference types="cypress" />
describe("Pool Certificate", () => {
  it("should navigate to the transaction detail from pool certificate e2e", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-operational_certificates"]').click();
    cy.get('[data-testid="submenu-button-pool_certificate"]').click();
    cy.get("tbody tr td").first().click();
    cy.get('[class*="MuiGrid-root"]').first().should("be.visible");
    cy.get(".MuiAccordionSummary-content div").contains("UTXOs", { matchCase: false });
    cy.get(".MuiAccordionSummary-content div").contains("Pool certificates", { matchCase: false });
    cy.get('[data-test-id="CircularProgressbarWithChildren__children"]').should("be.visible");
  });

  it("should navigate to the transaction detail from pool deregistration e2e", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-operational_certificates"]').click();
    cy.get('[data-testid="submenu-button-pool_deregistration"]').click();
    cy.get("tbody tr td a").first().click();
    cy.get('[class*="MuiGrid-root"]').first().should("be.visible");
    cy.get(".MuiAccordionSummary-content div").contains("UTXOs", { matchCase: false });
    cy.get(".MuiAccordionSummary-content div").contains("Pool certificates", { matchCase: false });
    cy.get('[data-test-id="CircularProgressbarWithChildren__children"]').should("be.visible");
  });

  it("should display CIP-60 in metadata tab", () => {
    const transaction = "a810ba9f89dc9e2aedbd722115c684dab646e3e9956b495b02ece5338cbc5c4a";
    cy.visit("/transactions");
    cy.get('[data-testid="search-bar"]').type(transaction).type("{enter}");
    cy.get("div").contains("transaction details", { matchCase: false }).should("be.visible");
    cy.get("div .MuiAccordion-root").contains("Metadata", { matchCase: false }).scrollIntoView().click();
    cy.wait(1000);
    cy.get(".MuiAccordion-region div").contains("Metadata Hash", { matchCase: false }).should("be.visible");
    cy.get(".MuiAccordion-region div").contains("Metadatum Label", { matchCase: false }).should("be.visible");
    cy.get(".MuiAccordion-region div").contains("Value", { matchCase: false }).should("be.visible");
    cy.get("[data-testid='clickable-cip60-badge']").should("be.visible");
    cy.get("[data-testid='clickable-cip60-badge']").click();

    cy.get("p").contains("Required Properties").should("be.visible");
    cy.get(`[data-testid="table-common"] tr th`).contains("Property");
    cy.get(`[data-testid="table-common"] tr th`).contains("Format");
    cy.get(`[data-testid="table-common"] tr th`).contains("Value");
    cy.get(`[data-testid="table-common"] tr th`).contains("Compliance");
    cy.get("p").contains("Other Properties").scrollIntoView().should("be.visible");
  });
});
