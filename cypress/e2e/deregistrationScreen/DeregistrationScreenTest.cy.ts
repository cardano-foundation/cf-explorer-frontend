describe("Deregistration screen", () => {
  it("User go to Staking Lifecycle and input the Stake Address, then verify the Deregistration Screen", () => {
    const stakeAddress = "stake1u8wfran22c8tk3jxvhzkdjfqvvn4g8gj56keq6lrw75s4wcq94rmf";
    cy.visit("/");
    cy.get('[data-testid="menu-button-staking_lifecycle"]').click();
    cy.get("input[placeholder]").type(stakeAddress).type("{enter}");
    cy.get("span").contains("Deregistration").click();
    cy.get('[data-testid="delegator-deregistration-hold-box"]').should("be.visible");
    cy.get('[data-testid="delegator-deregistration-fee-box"]').should("be.visible");
    cy.get('[data-testid="delegator-deregistration-certificate"]').should("be.visible");
    cy.get('[data-testid="delegator-deregistration-cardano-blockchain"]').should("be.visible");
  });
});
