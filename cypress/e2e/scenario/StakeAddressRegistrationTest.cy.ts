describe("User check information of stake address registration", () => {
  it("User go to Stake Addess Registration and click to first record, then verify the Stake Addess Detail screen", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-operational_certificates"]').click();
    cy.get('[data-testid="submenu-button-stake_address_registration"]').click();
    cy.get('[data-testid="search-bar"]');
    cy.get('[data-testid="table-common"]');
    cy.get('[data-testid="table-common"] tbody tr').eq(0).click();
    cy.get("a").contains("View Details", { matchCase: false }).click();
    cy.get('[data-testid="search-bar"]');
    cy.get(":nth-child(1) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Delegated to");
    cy.get(":nth-child(2) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Total Stake");
    cy.get(":nth-child(3) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains("Rewards available");

    cy.get(":nth-child(4) > .css-13ne0mf > .css-70qvj9 > .MuiBox-root").contains(" Rewards withdrawn");

    cy.get(".css-12euw8y").contains("Analytics");
    cy.get(".css-z5mtf5 > .css-0 > .css-ovbrb").contains("Highest Balance");
    cy.get(".css-1u4aebp > .css-0 > .css-ovbrb").contains("Lowest Balance");
    cy.get(".MuiAccordionSummary-root").contains("Delegation History");
    cy.get(".MuiAccordionSummary-root").contains("Stake Address History");
    cy.get(".MuiAccordionSummary-root").contains("Withdrawal History");
    cy.get(".MuiAccordionSummary-root").contains("Instantaneous Rewards");
    cy.get(".MuiAccordionSummary-root").contains("Transactions");
    cy.get('[data-testid="footer"]').scrollIntoView();
    cy.get('[data-testid="table-common"]');
    cy.wait(2000);

    cy.get(".MuiAccordionSummary-root").eq(0);
    cy.get('[data-testid="table-common"]');
    cy.get('[data-testid = "table-common"] th:nth-of-type(1)').contains("Transaction Hash");
    cy.get('[data-testid = "table-common"] th:nth-of-type(2)').contains("Created At");
    cy.get('[data-testid = "table-common"] th:nth-of-type(3)').contains("Block");
    cy.get('[data-testid = "table-common"] th:nth-of-type(4)').contains("Pool ID");
    cy.get('[data-testid = "table-common"] th:nth-of-type(5)').contains("Pool Name");

    cy.get(".MuiAccordionSummary-root").eq(1).click();
    cy.get('[data-testid="table-common"]');
    cy.get('[data-testid = "table-common"] th:nth-of-type(1)').contains("Transaction Hash");
    cy.get('[data-testid = "table-common"] th:nth-of-type(2)').contains("Created At");
    cy.get('[data-testid = "table-common"] th:nth-of-type(3)').contains("Block");
    cy.get('[data-testid = "table-common"] th').contains("Action");

    cy.get(".MuiAccordionSummary-root").eq(2).click();
    cy.get('[data-testid="table-common"]');
    cy.get('[data-testid = "table-common"] th:nth-of-type(1)').contains("Transaction Hash");
    cy.get('[data-testid = "table-common"] th:nth-of-type(2)').contains("Created At");
    cy.get('[data-testid = "table-common"] th:nth-of-type(3)').contains("Block");
    cy.get('[data-testid = "table-common"] th').contains("Amount");

    cy.get(".MuiAccordionSummary-root").eq(3).click();
    cy.get('[data-testid="table-common"]');
    cy.get('[data-testid = "table-common"] th:nth-of-type(1)').contains("Transaction Hash");
    cy.get('[data-testid = "table-common"] th:nth-of-type(2)').contains("Created At");
    cy.get('[data-testid = "table-common"] th:nth-of-type(3)').contains("Block");
    cy.get('[data-testid = "table-common"] th').contains("Rewards Paid");

    cy.get(".MuiAccordionSummary-root").eq(4).click();
    cy.get('[data-testid="table-common"]');
    //cy.get('[data-testid = "table-common"] th:nth-of-type(1)').should('be.visible').contains('#');
    cy.get('[data-testid = "table-common"] th:nth-of-type(1)').contains("Transaction Hash");
    cy.get('[data-testid = "table-common"] th:nth-of-type(2)').contains("Created At");
    cy.get('[data-testid = "table-common"] th:nth-of-type(3)').contains("Block");
    cy.get('[data-testid = "table-common"] th').contains("Fees");
    cy.get('[data-testid = "table-common"] th').contains("ADA amount");
    cy.get('[data-testid = "table-common"] th').contains("Token");
  });

  /*
    it("Sign in and verify the Stake Addess Report Detail screen",() => {
        cy.visit("/")
        cy.get('[data-testid="header-signin"]').click()
        cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').clear().type('yen.phan@sotatek.com')
        cy.get(':nth-child(3) > .MuiInputBase-root > .MuiInputBase-input').clear().type('Sotatek@123')
        cy.get('[data-testid="login-btn"]').click()

        cy.get('[data-testid="menu-button-staking_lifecycle"]').click();
        cy.get('[data-testid="table-common"] tbody tr').eq(0).click();

        cy.get('div').contains('Stake Address Registration').should('be.visible');
        cy.get('div').contains('Delegation History').should('be.visible');
        cy.get('div').contains('Rewards Distribution').should('be.visible');
        cy.get('div').contains('Withdrawal History').should('be.visible');
        cy.get('div').contains('Deregistration').should('be.visible');
        cy.get('div').contains('ADA Transfers').should('be.visible');
        cy.get('[data-testid="table-common"]').should('be.visible');

        cy.get('.MuiTabs-flexContainer button').eq(0).should('have.attr', 'aria-selected', 'true');
        cy.get('[data-testid="table-common"]').should('be.visible');
        cy.get('[data-testid = "table-common"] th:nth-of-type(1)').should('be.visible').contains('Transaction Hash');
        cy.get('[data-testid = "table-common"] th:nth-of-type(2)').should('be.visible').contains('Created At');
        cy.get('[data-testid = "table-common"] th:nth-of-type(3)').should('be.visible').contains('ADA Value');
        cy.get('[data-testid = "table-common"] th:nth-of-type(4)').should('be.visible').contains('Certificate');

        cy.get('.MuiTabs-flexContainer button').eq(1).click()
        cy.get('.MuiTabs-flexContainer button').eq(1).should('have.attr', 'aria-selected', 'true');
        cy.get('[data-testid="table-common"]').should('be.visible');
        cy.get('[data-testid = "table-common"] th:nth-of-type(1)').should('be.visible').contains('Transaction Hash');
        cy.get('[data-testid = "table-common"] th:nth-of-type(2)').should('be.visible').contains('Created At');
        cy.get('[data-testid = "table-common"] th:nth-of-type(3)').should('be.visible').contains('Fees');
        cy.get('[data-testid = "table-common"] th:nth-of-type(4)').should('be.visible').contains('Certificate');

        cy.get('.MuiTabs-flexContainer button').eq(2).click()
        cy.get('.MuiTabs-flexContainer button').eq(2).should('have.attr', 'aria-selected', 'true');
        cy.get('[data-testid="table-common"]').should('be.visible');
        cy.get('[data-testid = "table-common"] th:nth-of-type(1)').should('be.visible').contains('Rewards Paid');
        cy.get('[data-testid = "table-common"] th:nth-of-type(2)').should('be.visible').contains('Created At');
        cy.get('[data-testid = "table-common"] th:nth-of-type(3)').should('be.visible').contains('Epoch');

        cy.get('.MuiTabs-flexContainer button').eq(3).click()
        cy.get('.MuiTabs-flexContainer button').eq(3).should('have.attr', 'aria-selected', 'true');
        cy.get('[data-testid="table-common"]').should('be.visible');
        cy.get('[data-testid = "table-common"] th:nth-of-type(1)').should('be.visible').contains('Transaction Hash');
        cy.get('[data-testid = "table-common"] th:nth-of-type(2)').should('be.visible').contains('Created At');
        cy.get('[data-testid = "table-common"] th:nth-of-type(3)').should('be.visible').contains('Net Amount');

        cy.get('.MuiTabs-flexContainer button').eq(4).click()
        cy.get('.MuiTabs-flexContainer button').eq(4).should('have.attr', 'aria-selected', 'true');
        cy.get('[data-testid="table-common"]').should('be.visible');
        cy.get('[data-testid = "table-common"] th:nth-of-type(1)').should('be.visible').contains('Transaction Hash');
        cy.get('[data-testid = "table-common"] th:nth-of-type(2)').should('be.visible').contains('Created At');
        cy.get('[data-testid = "table-common"] th:nth-of-type(3)').should('be.visible').contains('ADA Amount');
        cy.get('[data-testid = "table-common"] th:nth-of-type(4)').should('be.visible').contains('Certificate');

        cy.get('.MuiTabs-flexContainer button').eq(5).click()
        cy.get('.MuiTabs-flexContainer button').eq(5).should('have.attr', 'aria-selected', 'true');
        cy.get('[data-testid="table-common"]').should('be.visible');
        cy.get('[data-testid = "table-common"] th:nth-of-type(1)').should('be.visible').contains('Amount ADA');
        cy.get('[data-testid = "table-common"] th:nth-of-type(2)').should('be.visible').contains('Created At');
        cy.get('[data-testid = "table-common"] th:nth-of-type(3)').should('be.visible').contains('Transaction Hash');
        cy.get('[data-testid = "table-common"] th:nth-of-type(4)').should('be.visible').contains('Status');
    });
    */
});
