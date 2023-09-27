describe("User check information of stake address deregistration", () => {
  it("User go to Stake Addess Deregistration and click to first record, then verify the Stake Addess Detail screen", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-operational_certificates"]').click();
    cy.get('[data-testid="submenu-button-stake_address_deregistration"]').click();
    cy.get('[data-testid="search-bar"]').should("be.visible");
    cy.get('[data-testid="table-common"]').should("be.visible");
    cy.get('[data-testid="table-common"] tbody tr').eq(0).click();
    cy.get(".css-62ep8s").contains("View Details", { matchCase: false }).click();

    cy.get('[data-testid="search-bar"]').should("be.visible");
    cy.get(":nth-child(1) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Delegated to").should("be.visible");
    cy.get(":nth-child(2) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Total Stake").should("be.visible");
    cy.get(":nth-child(3) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root")
      .contains("Rewards available")
      .should("be.visible");
    cy.get(":nth-child(4) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root")
      .contains(" Rewards withdrawn")
      .should("be.visible");
    cy.get(".css-12euw8y").contains("Analytics").should("be.visible");
    cy.get(".css-z5mtf5 > .css-0 > .css-ovbrb").contains("Highest Balance").should("be.visible");
    cy.get(".css-1u4aebp > .css-0 > .css-ovbrb").contains("Lowest Balance").should("be.visible");
    cy.get("div").contains("Delegation History").should("be.visible");
    cy.get("div").contains("Stake Address History").should("be.visible");
    cy.get("div").contains("Withdrawal History").should("be.visible");
    cy.get("div").contains("Instantaneous Rewards").should("be.visible");
    cy.get("div").contains("Transactions").should("be.visible");
    cy.get('[data-testid="footer"]').scrollIntoView();
    cy.get('[data-testid="table-common"]').should("be.visible");
    cy.wait(2000);

    cy.get(".MuiTabs-flexContainer button").eq(0).should("have.attr", "aria-selected", "true");
    cy.get('[data-testid="table-common"]').should("be.visible");
    cy.get('[data-testid = "table-common"] th:nth-of-type(1)').should("be.visible").contains("Transaction Hash");
    cy.get('[data-testid = "table-common"] th:nth-of-type(2)').should("be.visible").contains("Created At");
    cy.get('[data-testid = "table-common"] th:nth-of-type(3)').should("be.visible").contains("Block");
    cy.get('[data-testid = "table-common"] th:nth-of-type(4)').should("be.visible").contains("Pool ID");
    cy.get('[data-testid = "table-common"] th:nth-of-type(5)').should("be.visible").contains("Pool Name");

    cy.get(".MuiTabs-flexContainer button").eq(1).click();
    cy.get(".MuiTabs-flexContainer button").eq(1).should("have.attr", "aria-selected", "true");
    cy.get('[data-testid="table-common"]').should("be.visible");
    cy.get('[data-testid = "table-common"] th:nth-of-type(1)').should("be.visible").contains("Transaction Hash");
    cy.get('[data-testid = "table-common"] th:nth-of-type(2)').should("be.visible").contains("Created At");
    cy.get('[data-testid = "table-common"] th:nth-of-type(3)').should("be.visible").contains("Block");
    cy.get('[data-testid = "table-common"] th:nth-of-type(4)').should("be.visible").contains("Action");

    cy.get(".MuiTabs-flexContainer button").eq(2).click();
    cy.get(".MuiTabs-flexContainer button").eq(2).should("have.attr", "aria-selected", "true");
    cy.get('[data-testid="table-common"]').should("be.visible");
    cy.get('[data-testid = "table-common"] th:nth-of-type(1)').should("be.visible").contains("Transaction Hash");
    cy.get('[data-testid = "table-common"] th:nth-of-type(2)').should("be.visible").contains("Created At");
    cy.get('[data-testid = "table-common"] th:nth-of-type(3)').should("be.visible").contains("Block");
    cy.get('[data-testid = "table-common"] th:nth-of-type(4)').should("be.visible").contains("Amount");

    cy.get(".MuiTabs-flexContainer button").eq(3).click();
    cy.get(".MuiTabs-flexContainer button").eq(3).should("have.attr", "aria-selected", "true");
    cy.get('[data-testid="table-common"]').should("be.visible");
    cy.get('[data-testid = "table-common"] th:nth-of-type(1)').should("be.visible").contains("Transaction Hash");
    cy.get('[data-testid = "table-common"] th:nth-of-type(2)').should("be.visible").contains("Created At");
    cy.get('[data-testid = "table-common"] th:nth-of-type(3)').should("be.visible").contains("Block");
    cy.get('[data-testid = "table-common"] th:nth-of-type(4)').should("be.visible").contains("Rewards Paid");

    cy.get(".MuiTabs-flexContainer button").eq(4).click();
    cy.get(".MuiTabs-flexContainer button").eq(4).should("have.attr", "aria-selected", "true");
    cy.get('[data-testid="table-common"]').should("be.visible");
    cy.get('[data-testid = "table-common"] th:nth-of-type(1)').should("be.visible").contains("Transaction Hash");
    cy.get('[data-testid = "table-common"] th:nth-of-type(2)').should("be.visible").contains("Created At");
    cy.get('[data-testid = "table-common"] th:nth-of-type(3)').should("be.visible").contains("Block");
    cy.get('[data-testid = "table-common"] th:nth-of-type(4)')
      .should("be.visible")
      .contains("Fees", { matchCase: false });
    cy.get('[data-testid = "table-common"] th:nth-of-type(5)').should("be.visible").contains("ADA amount");
    cy.get('[data-testid = "table-common"] th:nth-of-type(6)').should("be.visible").contains("Token");
  });
});
