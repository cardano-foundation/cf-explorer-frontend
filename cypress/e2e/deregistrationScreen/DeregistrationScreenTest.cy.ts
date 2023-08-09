describe("Deregistration screen", () => {
  it("User go to Staking Lifecycle and input the Stake Address, then verify the Deregistration Screen", () => {
    const stakeAddress = "stake1uyeqqejrlf0g7d57qydvw78utfw3fv65tcxe0t69edfpdwsk8ksqy";
    cy.visit("/");
    cy.get('[data-testid="menu-button-staking_lifecycle"]').click();
    cy.get("input[placeholder]").type(stakeAddress).type("{enter}");
    cy.wait(2000);
    cy.get("span").contains("Deregistration").click();
    cy.get('[data-testid="delegator-deregistration-hold-box"]').should('be.visible');
    cy.get('[data-testid="delegator-deregistration-fee-box"]').should('be.visible');
    cy.get('[data-testid="delegator-deregistration-certificate"]').should('be.visible');
    cy.get('[data-testid="delegator-deregistration-cardano-blockchain"]').should('be.visible');
  });
});
