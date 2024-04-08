describe("Smartcontract Detail", () => {
  it("should navigate to the smartcontract detail page", () => {
    cy.visit(`/en/smart-contract/86bff95ba20e9d1d1b34899a56d86bbacc9fed999260b27dcc92d128`);
    cy.get("h2").contains("Smart Contract Details");
    cy.get('[data-testid="sc.scriptHash"]').contains("Script Hash", { matchCase: false });
    cy.get('[data-testid="sc.versionTitle"]').contains("Version", { matchCase: false });
    cy.get('[data-testid="sc.AssociatedAddresses"]').click();
    cy.url().should("include", "/associated", { matchCase: false });
    cy.get('[data-testid="sc.subNameTab"]').contains("Associated Addresses", { matchCase: false });
    cy.get('[data-testid="sc.transaction"]').click();
    cy.url().should("include", "/transactions", { matchCase: false });

    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Tx hash");
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Created At");
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Block");
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Epoch");
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Slot");
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Absolute Slot");
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Addresses");
    cy.get(`[data-testid="table-common"] tr th`).should("be.visible").contains("Purpose");
  });
});
