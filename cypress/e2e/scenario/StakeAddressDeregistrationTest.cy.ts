describe("User check information of stake address deregistration", () => {
  it("User go to Stake Addess Deregistration and click to first record, then verify the Stake Addess Detail screen", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-operational_certificates"]').click();
    cy.get('[data-testid="submenu-button-stake_address_deregistration"]').click();
    cy.get('[data-testid="search-bar"]');

    cy.get('[data-testid="table-common"] tbody tr').eq(0).click();
    cy.get(".css-62ep8s").contains("View Details", { matchCase: false }).click();

    cy.get('[data-testid="search-bar"]');
    cy.get("div").contains("Stake Address Details", { matchCase: false });
    cy.get(":nth-child(1) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Delegated to");
    cy.get(":nth-child(2) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Total Stake");
    cy.get(":nth-child(3) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Rewards available");
    cy.get(":nth-child(4) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains(" Rewards withdrawn");
    cy.get(".css-12euw8y").contains("Analytics");
    cy.get(".css-z5mtf5 > .css-0 > .css-ovbrb").contains("Highest Balance");
    cy.get(".css-1u4aebp > .css-0 > .css-ovbrb").contains("Lowest Balance");
    cy.get(".MuiAccordionSummary-content").contains("Delegation History");
    cy.get(".MuiAccordionSummary-content").contains("Stake Address History");
    cy.get(".MuiAccordionSummary-content").contains("Withdrawal History");
    cy.get(".MuiAccordionSummary-content").contains("Instantaneous Rewards");
    cy.get(".MuiAccordionSummary-content").contains("Transactions");
    cy.get('[data-testid="footer"]').scrollIntoView();

    cy.wait(2000);

    cy.get('[data-testid = "table-common"] th:nth-of-type(1)').contains("Transaction Hash");
    cy.get('[data-testid = "table-common"] th:nth-of-type(2)').contains("Created At");
    cy.get('[data-testid = "table-common"] th:nth-of-type(3)').contains("Block");
    cy.get('[data-testid = "table-common"] th:nth-of-type(4)').contains("Pool ID");
    cy.get('[data-testid = "table-common"] th:nth-of-type(5)').contains("Pool Name");

    cy.get(".MuiAccordionSummary-root").eq(1).click();

    cy.get('[data-testid = "table-common"] tr th').contains("Transaction Hash");
    cy.get('[data-testid = "table-common"] tr th').contains("Created At");
    cy.get('[data-testid = "table-common"] tr th').contains("Block");
    cy.get('[data-testid = "table-common"] tr th').contains("Action");

    cy.get(".MuiAccordionSummary-root").eq(2).click();

    cy.get('[data-testid = "table-common"] tr th').contains("Transaction Hash");
    cy.get('[data-testid = "table-common"] tr th').contains("Created At");
    cy.get('[data-testid = "table-common"] tr th').contains("Block");
    cy.get('[data-testid = "table-common"] tr th').contains("Amount");

    cy.get(".MuiAccordionSummary-root").eq(3).click();

    cy.get('[data-testid = "table-common"] tr th').contains("Transaction Hash");
    cy.get('[data-testid = "table-common"] tr th').contains("Created At");
    cy.get('[data-testid = "table-common"] tr th').contains("Block");
    cy.get('[data-testid = "table-common"] tr th').contains("Rewards Paid");

    cy.get(".MuiAccordionSummary-root").eq(4).click();

    cy.get('[data-testid = "table-common"] tr th').contains("Transaction Hash");
    cy.get('[data-testid = "table-common"] tr th').contains("Created At");
    cy.get('[data-testid = "table-common"] tr th').contains("Block");
    cy.get('[data-testid = "table-common"] tr th').contains("Fees");
    cy.get('[data-testid = "table-common"] tr th').contains("ADA amount");
    cy.get('[data-testid = "table-common"] tr th').contains("Token");
  });
});
