describe("Deregistration List screen", () => {
  it("User go to Staking Lifecycle and input the Pool ID, then verify the Deregistration List Screen", () => {
    const poolId = "pool1g60m45m23f5vta30x5z7e0n2gc02yc4wyz6darfeluy2kgu65fa";
    cy.visit("/");
    cy.get('[data-testid="menu-button-staking_lifecycle"]').click();
    cy.get("input[placeholder]").type(poolId).type("{enter}");
    cy.get("span").contains("Deregistration").click();
    //cy.get('[data-testid="overview-staking"]').should('be.visible');
    //cy.get('[data-testid="overview-staking-hash"]').should('be.visible');
    //cy.get('[data-testid="overview-staking-amount"]').should('be.visible');
    //cy.get('[data-testid="overview-staking-time"]').should('be.visible');
  });
});
