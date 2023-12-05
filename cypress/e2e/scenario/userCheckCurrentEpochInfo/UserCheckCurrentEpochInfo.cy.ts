describe("User check information of current Epoch", () => {
  it("User go to Epoch and click to current Epoch, then verify the Epoch detail Screen", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-blockchain"]').click();
    cy.get('[data-testid="submenu-button-epochs"]').click();
    cy.get('[data-testid="search-bar"]').should("be.visible");
    cy.get('[data-test-id="CircularProgressbarWithChildren"]').should("be.visible");
    cy.get('[data-testid="table-common"]').should("be.visible");

    cy.get('[data-test-id="CircularProgressbarWithChildren"]').click();
    cy.get("a").contains("View Details", { matchCase: false }).should("be.visible");

    cy.get("a").contains("View Details", { matchCase: false }).click();
    cy.get("div").contains("Start Timestamp", { matchCase: false }).should("be.visible");
    cy.get("div").contains("End Timestamp", { matchCase: false }).should("be.visible");
    cy.get("div").contains(" Total Output", { matchCase: false }).should("be.visible");
    cy.get("div").contains(" Blocks").should("be.visible");
    cy.get("div").contains(" Slot").should("be.visible");
    cy.get("div").contains(" Unique Accounts", { matchCase: false }).should("be.visible");
    cy.get("div").contains(" Transaction Count", { matchCase: false }).should("be.visible");
    cy.get("div").contains(" Rewards Distributed", { matchCase: false }).should("be.visible");
    cy.get('[data-testid="table-common"]').should("be.visible");
    cy.wait(2000);
    cy.get('[data-testid="footer"]').scrollIntoView();
    cy.get('[data-testid="table-common"] tbody tr').then(($element) => {
      if ($element.length > 10) {
        cy.get('[aria-label="pagination navigation"]').scrollIntoView();
        cy.get('[aria-label="pagination navigation"]').should("be.visible");
      } else {
        cy.log("Total Transaction record is less than 10");
      }
    });
  });
});
