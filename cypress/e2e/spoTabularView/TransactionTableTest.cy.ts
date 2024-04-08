describe("Transaction table", () => {
  it("User go to Staking Lifecycle and input the Pool Id, switch to tabular view then verify the Transaction table", () => {
    const poolId = "pool1g60m45m23f5vta30x5z7e0n2gc02yc4wyz6darfeluy2kgu65fa";
    cy.visit("/");
    cy.get('[data-testid="menu-button-staking_lifecycle"]').click();
    cy.get("input[placeholder]").type(poolId).type("{enter}");
    cy.get("span").contains("Deregistration").click();
    cy.get('[data-testid="spo.tabularMode"]').click();
    cy.get(".MuiAccordionSummary-content").contains("Registration");
    cy.get(".MuiAccordionSummary-content").contains("Pool Update");
    cy.get(".MuiAccordionSummary-content").contains("Operator Rewards");
    cy.get(".MuiAccordionSummary-content").contains("Deregistration");
  });
});
