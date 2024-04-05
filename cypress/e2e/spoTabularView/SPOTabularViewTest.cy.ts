describe("SPO Tabular view", () => {
  it("User go to Staking Lifecycle and input the Pool ID, switch to tabular view then verify the Staking Lifecycle Screen", () => {
    const poolId = "pool1g60m45m23f5vta30x5z7e0n2gc02yc4wyz6darfeluy2kgu65fa";
    cy.visit("/");
    cy.get('[data-testid="menu-button-staking_lifecycle"]').click();
    cy.get("input[placeholder]").type(poolId).type("{enter}");
    cy.get("span").contains("Deregistration").click();
    cy.get('[data-testid="spo.tabularMode"]').click();
    cy.get('[data-testid="table-common"]').should("be.visible");
  });
});
