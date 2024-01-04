describe("Script Page", () => {
  it("should navigate to the script page", () => {
    cy.visit(`/en/native-scripts-sc/native-scripts`);
    cy.wait(1000);
    cy.url().should("include", "/native-scripts", { matchCase: false });
    // cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Script Hash");
    // cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Number of Tokens");
    // cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Number of Asset Holders");

    cy.get('[data-testid="smartContractTab"]').click();
    cy.url().should("include", "/smart-contracts", { matchCase: false });
    // cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Script Hash");
    // cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Version");
    // cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Associated Addresses");
  });
});
