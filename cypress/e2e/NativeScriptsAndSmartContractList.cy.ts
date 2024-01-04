describe("Native Scripts & Smart Contracts", () => {
  it("should the page render", () => {
    cy.visit("/en/native-scripts-sc/native-scripts");
    cy.get(".MuiAccordionSummary-content").contains("Native Scripts", { matchCase: false });
    cy.get(".MuiAccordionSummary-content").contains("Smart Contracts", { matchCase: false });
    // cy.get("table tr th").contains("Script Hash", { matchCase: false });
    // cy.get("table tr th").contains("Number of Tokens", { matchCase: false });
    // cy.get("table tr th").contains("Number of Asset Holders", { matchCase: false });
  });

  it("should the tab should be change", () => {
    cy.visit("/en/native-scripts-sc/native-scripts");
    cy.get(".MuiAccordionSummary-content").contains("Native Scripts", { matchCase: false });
    cy.get(".MuiAccordionSummary-content").contains("Smart Contracts", { matchCase: false }).click();
    // cy.get("table tr th").contains("Script Hash", { matchCase: false });
    // cy.get("table tr th").contains("Version", { matchCase: false });
    // cy.get("table tr th").contains("Associated Addresses", { matchCase: false });
  });
});
