describe("User check information of latest Transaction", () => {
  it("User go to Transaction and click to latest transaction, then verify the Transaction detail Screen", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-blockchain"]').click();
    cy.get('[data-testid="submenu-button-transactions"]').click();
    cy.get('[data-testid="search-bar"]').should("be.visible");
    cy.get('[data-testid="table-common"]').should("be.visible");
    cy.get('[aria-label="pagination navigation"]').should("be.visible");

    cy.get('[data-testid="table-common"] tbody tr').eq(0).click();
    cy.get("a").contains("View Details", { matchCase: false }).should("be.visible");
    cy.get("a").contains("View Details", { matchCase: false }).click();
    cy.wait(2000);

    cy.get('[data-testid="search-bar"]').should("be.visible");
    cy.get("div").contains("Input").should("be.visible");
    cy.get("div").contains("Output").should("be.visible");
    cy.get("div").contains("Created At", { matchCase: false }).should("be.visible");
    cy.get("div").contains("Confirmation", { matchCase: false }).should("be.visible");
    cy.get("div").contains("Total Output", { matchCase: false }).should("be.visible");
    cy.get("div").contains("Transaction Fees", { matchCase: false }).should("be.visible");
    cy.get("div").contains("Block").should("be.visible");
    cy.get("div").contains("Slot").should("be.visible");
    cy.get(".MuiAccordionSummary-content div").contains("UTXOs", { matchCase: false });
  });
});
